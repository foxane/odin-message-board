const messageController = require('../controllers/messageController');
const { Router } = require('express');
const messageRouter = Router();

messageRouter.get('/details?/:messageId', messageController.messageDetail);
messageRouter.get('/new', messageController.getForm);
messageRouter.post(
  '/new',
  messageController.validateForm,
  messageController.insertMessage,
);
messageRouter.get('/', messageController.indexGet);

module.exports = messageRouter;
