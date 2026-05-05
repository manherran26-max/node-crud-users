import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

const { Pool } = pg;

// 🔌 Crear conexión
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

// 🚀 Inicializar base de datos
const initDB = async () => {
  try {
    // Verificar conexión
    await pool.connect();
    console.log("DB conectada ✅");

    // Crear tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(40),
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log("Tabla users lista ✅");

    // Insertar datos iniciales (sin duplicar)
    await pool.query(`
      INSERT INTO users (name, email)
      VALUES 
      ('joe', 'joe@ibm.com'),
      ('ryan', 'ryan@faztweb.com')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log("Datos iniciales insertados ✅");

  } catch (error) {
    console.error("Error inicializando DB:", error);
  }
};

// Ejecutar al iniciar
initDB();