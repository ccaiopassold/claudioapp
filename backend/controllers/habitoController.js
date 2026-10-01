import pool from "../config/database.js";

// ========================================
// LISTAR HÁBITOS
// ========================================

export const listarHabitos = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const resultado = await pool.query(
            `SELECT id, nome, categoria, frequencia, horario, criado_em
             FROM habitos
             WHERE usuario_id = $1
             ORDER BY id DESC`,
            [usuarioId]
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar hábitos."
        });
    }
};


// ========================================
// CRIAR HÁBITO
// ========================================

export const criarHabito = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const {
            nome,
            categoria,
            frequencia,
            horario
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "O nome do hábito é obrigatório."
            });
        }

        const resultado = await pool.query(
            `INSERT INTO habitos
                (usuario_id, nome, categoria, frequencia, horario)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, nome, categoria, frequencia, horario, criado_em`,
            [
                usuarioId,
                nome,
                categoria || null,
                frequencia || null,
                horario || null
            ]
        );

        res.status(201).json({
            mensagem: "Hábito criado com sucesso.",
            habito: resultado.rows[0]
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao criar hábito."
        });
    }
};


// ========================================
// ATUALIZAR HÁBITO
// ========================================

export const atualizarHabito = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { id } = req.params;

        const {
            nome,
            categoria,
            frequencia,
            horario
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: "O nome do hábito é obrigatório."
            });
        }

        const resultado = await pool.query(
            `UPDATE habitos
             SET nome = $1,
                 categoria = $2,
                 frequencia = $3,
                 horario = $4
             WHERE id = $5
               AND usuario_id = $6
             RETURNING id, nome, categoria, frequencia, horario, criado_em`,
            [
                nome,
                categoria || null,
                frequencia || null,
                horario || null,
                id,
                usuarioId
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Hábito não encontrado."
            });
        }

        res.json({
            mensagem: "Hábito atualizado com sucesso.",
            habito: resultado.rows[0]
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao atualizar hábito."
        });
    }
};


// ========================================
// EXCLUIR HÁBITO
// ========================================

export const excluirHabito = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM habitos
             WHERE id = $1
               AND usuario_id = $2
             RETURNING id`,
            [id, usuarioId]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Hábito não encontrado."
            });
        }

        res.json({
            mensagem: "Hábito excluído com sucesso."
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao excluir hábito."
        });
    }
};