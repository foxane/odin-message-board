const express = require('express');
const path = require('node:path');
const { indexRouter, formRouter, messageRouter } = require('./router');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/new', formRouter);
app.use('/messages?', messageRouter);

app.get('*', (req, res) => {
  res.render('404', { error: 'Page not found' });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
