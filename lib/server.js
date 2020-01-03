const express = require('express');
const helmet = require('helmet');
const { connect } = require('./connector');
const app = express();
const cors = require('cors');

const { initRoutes } = require('../lib/router');

try {
	app.use(cors());
	app.use(helmet());
	const router = initRoutes(express);
	app.use('/twitterStats', router);
	connect();
	app.listen(process.env.PORT || 3001);
	console.log('Server up and running...');
} catch (e) {
	console.log('Server failed to start with error:\n', e);
}