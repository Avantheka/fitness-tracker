import { initDB } from './server/db/db.js';
import db from './server/db/db.js';

await initDB(); 
console.log("DB Initialized");
console.log("Current DB Content:", db.data);
