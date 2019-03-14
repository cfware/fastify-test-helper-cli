# @cfware/fastify-test-helper-cli

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

CLI command to start a stand-alone server using [@cfware/fastify-test-helper]

### Install @cfware/fastify-test-helper-cli

This module requires node.js 8 or above.

```sh
npm i -D @cfware/fastify-test-helper
npm i -g @cfware/fastify-test-helper-cli
```


## Usage

Just run `cfware-fastify-test-helper` from inside your project.  This will pull options
from the default export of `./test/helpers/fastify-test-helper.config` found relative
to your project directory.

You can provide an alternative options file `cfware-fastify-test-helper /path/to/options.js`.
This will find the directory of the project which contains your options file.

In all cases a `process.chdir` is performed so the server runs from the project directory.

The options file can be in `ESM`, `CJS` or `JSON` format.  `@cfware/fastify-test-helper`
will be imported from the project which includes the options file.


## Running tests

Tests are provided by xo and ava.

```sh
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/@cfware/fastify-test-helper-cli.svg
[npm-url]: https://npmjs.org/package/@cfware/fastify-test-helper-cli
[travis-image]: https://travis-ci.org/cfware/fastify-test-helper-cli.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/fastify-test-helper-cli
[gk-image]: https://badges.greenkeeper.io/cfware/fastify-test-helper-cli.svg
[downloads-image]: https://img.shields.io/npm/dm/@cfware/fastify-test-helper-cli.svg
[downloads-url]: https://npmjs.org/package/@cfware/fastify-test-helper-cli
[license-image]: https://img.shields.io/npm/l/@cfware/fastify-test-helper-cli.svg
