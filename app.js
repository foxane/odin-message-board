const express = require('express');
const path = require('node:path');
const { indexRouter, formRouter, messageRouter } = require('./router');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Server hit log
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  const logMessage = `${currentTime} - ${req.method} ${req.originalUrl}`;
  console.log(logMessage);
  next();
});

app.use('/', indexRouter);
app.use('/new', formRouter);
app.use('/messages?', messageRouter);

app.get('*', (req, res) => {
  res.render('404', { error: 'Page not found' });
});

app.listen(3030);
