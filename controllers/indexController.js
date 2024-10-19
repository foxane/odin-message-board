const { getAllMessages, countMessage } = require('../db/queries');
const MESSAGE_LIMIT = 10;

const indexGet = async (req, res) => {
  // Offset
  const currentPage = req.query.page || 1;
  const offset = (currentPage - 1) * MESSAGE_LIMIT;

  const row = await getAllMessages(offset);
  const recordCount = await countMessage();

  // Pagination
  const pageCount = Math.ceil(recordCount / MESSAGE_LIMIT);

  res.render('index', { messages: row, currentPage, pageCount });
};

const indexNotFound = (req, res) => {
  res.status(404).render('error', { error: 'Page not found' });
};

module.exports = { indexGet, indexNotFound };
