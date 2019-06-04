#!/usr/bin/env node
'use strict';

const path = require('path');

const pkgDir = require('pkg-dir');
const importFrom = require('import-from');
const esm = require('esm')(module);

async function run(settings) {
	const {FastifyTestHelper} = importFrom(process.cwd(), '@cfware/fastify-test-helper');
	const fth = new FastifyTestHelper(null, settings);
	const daemon = await fth.daemonFactory();

	const daemonURL = fth.daemonGetURL(daemon, '');
	if (settings.demoPage) {
		const testsPrefix = settings.testsPrefix || '/';
		console.log(daemonURL.slice(0, -testsPrefix.length) + settings.demoPage);
	} else {
		console.log(daemonURL);
	}
}

async function chpkgdir(fileArg) {
	const dir = await pkgDir() || (fileArg && await pkgDir(path.dirname(fileArg)));
	if (!dir) {
		throw new Error('Cannot find project directory');
	}

	process.chdir(dir);
}

async function findLoadPath(cwd, fileArg) {
	if (fileArg) {
		return path.resolve(cwd, fileArg);
	}

	return path.resolve(process.cwd(), 'fastify-test-helper.config.js');
}

async function main() {
	try {
		const fileArg = process.argv[2];
		const initialcwd = process.cwd();
		await chpkgdir(fileArg);
		const loadFrom = await findLoadPath(initialcwd, fileArg);
		const settings = esm(loadFrom);
		await run(settings.__esModule ? settings.default : settings);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
