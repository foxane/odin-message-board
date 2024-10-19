#! /usr/bin/env node

const readline = require('node:readline');
const { Client } = require('pg');
const DATABASE_URL = process.argv[2];
const isForced = process.argv[3] || false;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(500) NOT NULL,
    username VARCHAR(20) NOT NULL,
    send_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reply_to INT
  );
`;
const CHECK_TABLE = `SELECT COUNT(*) FROM messages`;
const INSERT_RECORD = `
  INSERT INTO messages (message,username)
  VALUES ('Hello, welcome to my message board. You can post anything you want here. No moderation at all, probably.
  If you want to contribute or found any issue, feel free to visit the github repo. I would love any criticism on the code. The link is somewhere in this page, if i didn''t forget to add them.
  Anyway, thanks for visiting, Don''t forget to leave your message here :)', 'Foxane');
`;

async function seed() {
  console.log('\nSeeding...');
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(CREATE_TABLE);

    // Abort when table is empty
    const res = await client.query(CHECK_TABLE);
    const count = parseInt(res.rows[0].count, 10);
    if (count > 0 && !isForced) {
      console.log('\x1b[31;1mDatabase is not empty. Aborted seeding\x1b[0m');
      console.log('To force seeding, add "force" after database url');
      return;
    }

    await client.query(INSERT_RECORD);
    console.log('\x1b[32;1mSeeding done\x1b[0m');
  } catch (error) {
    console.error('\x1b[31;1mSeeding failed:\x1b[0m', error.message);
  } finally {
    await client.end();
  }
}

function main() {
  if (!DATABASE_URL) {
    console.log('Please specify the database url.');
    process.exit();
  }

  console.clear();
  rl.question(
    `
This script should only executed once and will populate the database.

Database url: \x1b[32;1m${DATABASE_URL}\x1b[0m
Insert query: ${INSERT_RECORD}

\x1b[31;1mWarning: This action is irreversible!\x1b[0m
Are you sure you want to proceed? (y/n): `,
    answer => {
      if (answer.toLowerCase() === 'y') {
        seed();
      } else {
        console.log('\n\x1b[31;1mSeeding canceled\x1b[0m');
      }
      rl.close();
    },
  );
}

main();
