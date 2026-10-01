import express from "express";

import {
    listarCompromissos,
    criarCompromisso,
    atualizarCompromisso,
    excluirCompromisso
} from "../controllers/compromissoController.js";

import { autenticarUsuario } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", autenticarUsuario, listarCompromissos);

router.post("/", autenticarUsuario, criarCompromisso);

router.put("/:id", autenticarUsuario, atualizarCompromisso);

router.delete("/:id", autenticarUsuario, excluirCompromisso);

export default router;