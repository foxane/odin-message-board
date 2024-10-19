const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

// Idk what to put on message root
const indexGet = (req, res) => {
  res.redirect('/');
};

const messageDetail = async (req, res) => {
  const messageId = req.params.messageId;
  const message = await db.getMessage(messageId);

  res.render('messageDetail', { message });
};

const getForm = async (req, res) => {
  if (req.query.reply) {
    const messageId = Number(req.query.reply);
    const messageCount = await db.countMessage();
    const isReply = messageId <= messageCount ? true : false;
    return res.render('newMessage', { messageId, isReply });
  }
  res.render('newMessage');
};

const validateForm = async (req, res, next) => {
  try {
    const messageCount = await db.countMessage();

    // Validation rules
    await body('username')
      .trim()
      .notEmpty()
      .isLength({ min: 1, max: 20 })
      .withMessage('Username should be between 1 and 20 characters')
      .run(req);
    await body('message')
      .notEmpty()
      .isLength({ min: 1, max: 500 })
      .withMessage('Message should contain between 1 and 500 character')
      .run(req);
    await body('reply_to')
      .optional()
      // Convert reply_to to number
      .custom(val => {
        const number = Number(val);
        if (isNaN(number)) {
          throw new Error('Message id is not a number');
        }
        return number;
      })
      .isInt({ min: 1, max: messageCount })
      .withMessage(
        "The message you are replying to doesn't exist. Sneaky,  aren't we?",
      )
      .run(req);

    // Bad request error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.errors);
      return res.status(400).render('newMessage', {
        errorArray: errors.errors,
      });
    }

    next();
  } catch (error) {
    // Internal server error

    console.log('failed to get database', error);
    return res.status(500).render('error', { error: error.message });
  }
};

const insertMessage = async (req, res) => {
  try {
    const { username, message, reply_to } = req.body;
    await db.insertMessage({ username, message, reply_to });

    res.status(201).redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/');
  }
};

module.exports = {
  indexGet,
  messageDetail,
  getForm,
  validateForm,
  insertMessage,
};
