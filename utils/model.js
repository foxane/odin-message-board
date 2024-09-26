const formatDate = require('./formatDate');

class Message {
  static messages = [];
  static idCounter = 0;

  constructor(user, text) {
    this.text = text ? text : 'WHY DIDNT YOU WRITE THE MESSAGE???????';
    this.user = user ? user : 'NOT A SENDER!!!!';
    this.id = Message.idCounter++;
    this.added = new Date();
    this.date = formatDate(this.added);
    Message.messages.push(this);
  }

  static getMessage(id) {
    return Message.messages.find((item) => item.id === id);
  }
}

// Create placeholder for messages
new Message('King', 'Its beautiful day outside');
new Message('Isis Supporter', 'Right? Birds are singing');
new Message('Not isis supporter', 'Flowers ar blooming');
new Message('Reef', 'On days like these');
new Message('Blower', 'Kid like you..');

module.exports = Message;
