import express from "express";
import usersRoutes from "./src/routes/users.routes.js";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Necesario para usar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 👇 SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

// 👇 RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 👇 RUTAS API
app.use(usersRoutes);

app.listen(PORT);
console.log("Server on port", PORT);