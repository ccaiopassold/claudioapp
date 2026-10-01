import express from "express";

import {
    listarHabitos,
    criarHabito,
    atualizarHabito,
    excluirHabito
} from "../controllers/habitoController.js";

import { autenticarUsuario } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", autenticarUsuario, listarHabitos);

router.post("/", autenticarUsuario, criarHabito);

router.put("/:id", autenticarUsuario, atualizarHabito);

router.delete("/:id", autenticarUsuario, excluirHabito);

export default router;