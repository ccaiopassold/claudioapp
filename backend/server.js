import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import pool from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import habitoRoutes from "./routes/habitoRoutes.js";
import compromissoRoutes from "./routes/compromissoRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Caminho da pasta do projeto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const raizProjeto = path.resolve(__dirname, "..");

app.use(cors());
app.use(express.json());

// Servir arquivos do frontend
app.use(express.static(raizProjeto));

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/habitos", habitoRoutes);
app.use("/api/compromissos", compromissoRoutes);

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(raizProjeto, "index.html"));
});

// Status da API e banco
app.get("/api/status", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT NOW() AS horario");

        res.json({
            status: "online",
            banco: "conectado",
            horario: resultado.rows[0].horario
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            status: "erro",
            banco: "desconectado"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});