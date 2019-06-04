import path from 'path';
import {spawn} from 'child_process';

import test from 'ava';
import pEvent from 'p-event';

const pkgDir = path.resolve(__dirname, '..');
const pkgParentDir = path.resolve(pkgDir, '..');
const binFile = path.resolve(pkgDir, 'bin.js');
const testAliasESM = path.resolve(pkgDir, 'helpers/alias.js');
const testJSON = path.resolve(pkgDir, 'helpers/json.json');

test('specific relative esm', t => {
	const proc = spawn(process.execPath, [binFile, path.relative(pkgDir, testAliasESM)], {
		cwd: pkgDir
	});

	proc.stdout.on('data', data => {
		t.regex(data.toString(), /^http:\/\/localhost:\d+\/alias\/\n$/);
		proc.kill('SIGINT');
	});

	return pEvent(proc, 'close');
});

test('from outside project', t => {
	const proc = spawn(process.execPath, [binFile, path.relative(pkgParentDir, testAliasESM)], {
		cwd: pkgParentDir
	});

	proc.stdout.on('data', data => {
		t.regex(data.toString(), /^http:\/\/localhost:\d+\/alias\/\n$/);
		proc.kill('SIGINT');
	});

	return pEvent(proc, 'close');
});

test('specific json', t => {
	const proc = spawn(process.execPath, [binFile, path.relative(pkgDir, testJSON)], {
		cwd: pkgDir
	});

	proc.stdout.on('data', data => {
		t.regex(data.toString(), /^http:\/\/localhost:\d+\/json\/\n$/);
		proc.kill('SIGINT');
	});

	return pEvent(proc, 'close');
});

test('demoPage 1', t => {
	const proc = spawn(process.execPath, [binFile, path.resolve(pkgDir, 'helpers/demo1')]);

	proc.stdout.on('data', data => {
		t.regex(data.toString(), /^http:\/\/localhost:\d+\/demo1\/\n$/);
		proc.kill('SIGINT');
	});

	return pEvent(proc, 'close');
});

test('demoPage 2', t => {
	const proc = spawn(process.execPath, [binFile, path.resolve(pkgDir, 'helpers/demo2')]);

	proc.stdout.on('data', data => {
		t.regex(data.toString(), /^http:\/\/localhost:\d+\/demo2\/\n$/);
		proc.kill('SIGINT');
	});

	return pEvent(proc, 'close');
});

test('default from subdir of project', t => {
	const proc = spawn(process.execPath, [binFile], {
		cwd: __dirname
	});

	proc.stdout.on('data', data => {
		t.regex(data.toString(), /^http:\/\/localhost:\d+\/fastify-test-helper.config\/\n$/);
		proc.kill('SIGINT');
	});

	return pEvent(proc, 'close');
});

test('file doesn\'t exist', async t => {
	const invalidFile = path.resolve(pkgDir, 'helpers', 'this-does-not-exist.js');
	const proc = spawn(process.execPath, [binFile, invalidFile]);

	let stderr = '';
	proc.stderr.on('data', data => {
		stderr += data.toString();
	});

	const code = await pEvent(proc, 'close');
	t.is(code, 1);
	t.regex(stderr, /Error: Cannot find module '.*this-does-not-exist\.js'/);
});

test('unresolvable project', async t => {
	const outOfProject = path.resolve(pkgParentDir, 'out-of-project.js');
	const proc = spawn(process.execPath, [binFile, outOfProject], {
		cwd: pkgParentDir
	});

	let stderr = '';
	proc.stderr.on('data', data => {
		stderr += data.toString();
	});

	const code = await pEvent(proc, 'close');
	t.is(code, 1);
	t.true(stderr.includes('Error: Cannot find project directory\n'));
});
