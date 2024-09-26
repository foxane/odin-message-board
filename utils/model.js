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
new Message('A very long username, it should have only 5 chars max');
new Message(
  '',
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
);

module.exports = Message;
