const pool = require('./pool');

/**
 * Get total messages on database
 * @returns {Promise<number>} - Total of all messages
 */
async function countMessage() {
  const { rows } = await pool.query('SELECT COUNT (*) FROM messages;');
  return Number(rows[0].count);
}

/**
 * Get all message based on offset with limit of 10
 * @param {number} offset - Offset to use on database query
 * @returns {Promise<Array<Object>>} - Array of message object
 */
async function getAllMessages(offset) {
  const { rows } = await pool.query(
    `SELECT * FROM messages ORDER BY id DESC OFFSET $1 LIMIT 10;`,
    [offset],
  );
  return rows;
}

/**
 * Get single message object
 * @param {Number} messageId - The message id to get
 * @returns {Promise<Object>} - The message object contains {id,username,message,reply_to}
 */
async function getMessage(messageId) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1;', [
    messageId,
  ]);
  return rows[0];
}

/**
 * Inserts new message to database.
 * @param {Object} param0 - The message details.
 * @param {string} param0.username - The sender username
 * @param {string} param0.message - The message content
 * @param {number|null} [param0.reply_to] - The ID of the message being replied to (optional).
 */
async function insertMessage({ username, message, reply_to }) {
  await pool.query(
    'INSERT INTO messages (username, message, reply_to) VALUES ($1,$2,$3);',
    [username, message, reply_to],
  );
}

module.exports = {
  getAllMessages,
  countMessage,
  getMessage,
  insertMessage,
};
