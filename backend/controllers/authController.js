import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";


// ========================================
// CADASTRO
// ========================================

export const cadastrarUsuario = async (req, res) => {

    try {

        const { nome, email, senha } = req.body;


        if (!nome || !email || !senha) {

            return res.status(400).json({
                mensagem: "Nome, email e senha são obrigatórios."
            });

        }


        const usuarioExistente = await pool.query(
            "SELECT id FROM usuarios WHERE email = $1",
            [email]
        );


        if (usuarioExistente.rows.length > 0) {

            return res.status(409).json({
                mensagem: "Este email já está cadastrado."
            });

        }


        const senhaCriptografada = await bcrypt.hash(senha, 10);


        const resultado = await pool.query(
            `INSERT INTO usuarios (nome, email, senha)
             VALUES ($1, $2, $3)
             RETURNING id, nome, email, criado_em`,
            [nome, email, senhaCriptografada]
        );


        res.status(201).json({

            mensagem: "Usuário cadastrado com sucesso.",

            usuario: resultado.rows[0]

        });


    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });

    }

};


// ========================================
// LOGIN
// ========================================

export const loginUsuario = async (req, res) => {

    try {

        const { email, senha } = req.body;


        // Verifica se os campos foram preenchidos

        if (!email || !senha) {

            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios."
            });

        }


        // Procura o usuário pelo email

        const resultado = await pool.query(
            `SELECT id, nome, email, senha
             FROM usuarios
             WHERE email = $1`,
            [email]
        );


        // Usuário não encontrado

        if (resultado.rows.length === 0) {

            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });

        }


        const usuario = resultado.rows[0];


        // Compara a senha digitada com o hash salvo

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );


        if (!senhaCorreta) {

            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });

        }


        // Cria o token JWT

        const token = jwt.sign(

            {
                id: usuario.id,
                email: usuario.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


        // Envia a resposta

        res.json({

            mensagem: "Login realizado com sucesso.",

            token: token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }

        });


    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });

    }

};