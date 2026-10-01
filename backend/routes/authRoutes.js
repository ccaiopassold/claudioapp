import express from "express";

import {
    cadastrarUsuario,
    loginUsuario
} from "../controllers/authController.js";

import { autenticarUsuario } from "../middleware/authMiddleware.js";


const router = express.Router();


// ========================================
// CADASTRO
// ========================================

router.post("/cadastro", cadastrarUsuario);


// ========================================
// LOGIN
// ========================================

router.post("/login", loginUsuario);


// ========================================
// ROTA PROTEGIDA - TESTE
// ========================================

router.get("/perfil", autenticarUsuario, (req, res) => {

    res.json({
        mensagem: "Você está autenticado!",
        usuario: req.usuario
    });

});


export default router;