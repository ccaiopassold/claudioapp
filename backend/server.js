import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.json({
        mensagem: "API do ClaudioCK funcionando!"
    });
});

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