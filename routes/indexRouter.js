const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.all('*', indexController.indexNotFound);

module.exports = indexRouter;
