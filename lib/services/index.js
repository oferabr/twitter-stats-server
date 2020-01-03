const { handle:handleStream } = require('./handleStream');
const { handle:handleRequest } = require('./handleRequest');

Object.assign(module.exports,
	{ handleRequest, handleStream }
);
