const { Router } = require('express');
const Message = require('./utils/model');
const indexRouter = Router();
const formRouter = Router();
const messageRouter = Router();

// Index controller
indexRouter.get('/', (req, res) => {
  res.render('index', {
    title: 'Mini Message Board',
    messages: Message.messages,
  });
});

// Form controller
formRouter.get('/', (req, res) => {
  res.render('form');
});
formRouter.post('/', (req, res) => {
  const { user, text } = req.body;
  new Message(user, text);
  res.redirect('/');
});

// Message controller
messageRouter.get('/', (req, res) => {
  res.redirect('/');
});
messageRouter.get('/:id', (req, res) => {
  const message = Message.getMessage(Number(req.params.id));
  if (message) {
    res.render('message', {
      message: message,
      currentId: message.id,
      maxId: Message.idCounter,
    });
  } else {
    res.render('404', { error: 'Message not found!' });
  }
});

module.exports = { indexRouter, formRouter, messageRouter };
