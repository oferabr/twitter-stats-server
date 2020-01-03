const { isAlive, getStats } = require('./controller');

const initRoutes = express => {

	const router = express.Router();
	router.get('/stats', getStats);
	router.get('/isAlive', isAlive);
	return router;
};

Object.assign(module.exports,
	{ initRoutes }
);
