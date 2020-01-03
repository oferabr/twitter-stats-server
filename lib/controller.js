const { handleRequest } = require('./services');
const startTime = new Date();

const isAlive = (req, res) => res.send({ message: `tweetsInfo server is alive: ${startTime}` });
const FAILURE_HTTP_STATUS = 500;


const getStats = (req, res) => {
	try {
		const result = handleRequest(startTime);
		res.send(result);
	}
	catch (e) {
		console.log('service failed to perform request', e);
		res.status(FAILURE_HTTP_STATUS);
		res.send({
			title: 'Failed to get results',
			message: 'Please try again'
		});
	}

};

Object.assign(module.exports, {
	isAlive,
	getStats
});
