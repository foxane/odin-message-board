require('dotenv').config();
const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const messageRouter = require('./routes/messageRouter');
const app = express();

app.use(express.urlencoded({ extended: true })); // Parse req.body

app.set('views', path.join(__dirname, 'views')); // Template dir
app.set('view engine', 'ejs'); // Template engine

app.use('/messages?', messageRouter);
app.use('/', indexRouter);
app.all('*', indexRouter);

app.use((err, req, res, next) => {
  console.log('Uncaught error: ', err.msg);
  res.status(400).render('error', { error: err.msg });
});

app.listen(process.env.PORT, () => {
  console.log('Server started at port: ', process.env.PORT);
});
