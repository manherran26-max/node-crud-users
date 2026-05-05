import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

const { Pool } = pg;

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 🚀 Inicializar DB sin romper el server
(async () => {
  try {
    console.log("Conectando a DB...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(40),
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await pool.query(`
      INSERT INTO users (name, email)
      VALUES 
      ('joe', 'joe@ibm.com'),
      ('ryan', 'ryan@faztweb.com')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log("DB lista ✅");

  } catch (error) {
    console.error("Error DB:", error);
  }
})();