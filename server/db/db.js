import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);

const defaultData = { tracking: [], users: [] };
const db = new Low(adapter, defaultData);

export async function initDB() {
  await db.read();

  db.data ||= defaultData;

  await db.write();
  console.log("initDB: DB initialized with data", db.data);
}

export default db;