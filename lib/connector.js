const request = require('request');
const { get } = require('lodash');
const es = require('event-stream');
const JSONStream = require('JSONStream');
const config = require('../config/appConf');
const env = process.env.NODE_ENV || 'default';
const streamUrl = get(config, `streamUrl.${env}.host`);
const { handleStream } = require('./services');

const connect = () =>{
	try{
	request({url: streamUrl})
		.pipe(JSONStream.parse())
		.pipe(es.mapSync(function (data) {
			handleStream(data);
		}));
    }catch (e) {
		console.log('an error has occured', e);
    }

};

Object.assign(module.exports,{
	connect
});




