import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

const adapter = new JSONFile(path.resolve('./server/db/db.json')); 
const db = new Low(adapter);

export async function initDB() {
  await db.read();

  db.data ||= {
    tracking: [],
    users: []
  };

  await db.write();
}

export default db;
