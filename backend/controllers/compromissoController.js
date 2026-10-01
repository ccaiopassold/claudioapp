import pool from "../config/database.js";

// ========================================
// LISTAR COMPROMISSOS
// ========================================

export const listarCompromissos = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const resultado = await pool.query(
            `SELECT id, titulo, data, horario, local, descricao, concluido
             FROM compromissos
             WHERE usuario_id = $1
             ORDER BY data ASC, horario ASC`,
            [usuarioId]
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar compromissos."
        });
    }
};


// ========================================
// CRIAR COMPROMISSO
// ========================================

export const criarCompromisso = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const {
            titulo,
            data,
            horario,
            local,
            descricao
        } = req.body;

        if (!titulo || !data) {
            return res.status(400).json({
                mensagem: "Título e data são obrigatórios."
            });
        }

        const resultado = await pool.query(
            `INSERT INTO compromissos
                (usuario_id, titulo, data, horario, local, descricao)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, titulo, data, horario, local, descricao, concluido`,
            [
                usuarioId,
                titulo,
                data,
                horario || null,
                local || null,
                descricao || null
            ]
        );

        res.status(201).json({
            mensagem: "Compromisso criado com sucesso.",
            compromisso: resultado.rows[0]
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao criar compromisso."
        });
    }
};


// ========================================
// ATUALIZAR COMPROMISSO
// ========================================

export const atualizarCompromisso = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { id } = req.params;

        const {
            titulo,
            data,
            horario,
            local,
            descricao,
            concluido
        } = req.body;

        if (!titulo || !data) {
            return res.status(400).json({
                mensagem: "Título e data são obrigatórios."
            });
        }

        const resultado = await pool.query(
            `UPDATE compromissos
             SET titulo = $1,
                 data = $2,
                 horario = $3,
                 local = $4,
                 descricao = $5,
                 concluido = $6
             WHERE id = $7
               AND usuario_id = $8
             RETURNING id, titulo, data, horario, local, descricao, concluido`,
            [
                titulo,
                data,
                horario || null,
                local || null,
                descricao || null,
                concluido ?? false,
                id,
                usuarioId
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Compromisso não encontrado."
            });
        }

        res.json({
            mensagem: "Compromisso atualizado com sucesso.",
            compromisso: resultado.rows[0]
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao atualizar compromisso."
        });
    }
};


// ========================================
// EXCLUIR COMPROMISSO
// ========================================

export const excluirCompromisso = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM compromissos
             WHERE id = $1
               AND usuario_id = $2
             RETURNING id`,
            [id, usuarioId]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Compromisso não encontrado."
            });
        }

        res.json({
            mensagem: "Compromisso excluído com sucesso."
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao excluir compromisso."
        });
    }
};