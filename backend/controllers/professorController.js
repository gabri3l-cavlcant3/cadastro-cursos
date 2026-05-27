const Professor = require('../models/Professor');

exports.getProfessores = (req, res) => {

    const professores = Professor.listar();

    res.json(professores);
};

exports.getProfessor = (req, res) => {

    const professor = Professor.buscarPorId(req.params.id);

    if (!professor) {

        return res.status(404).json({
            mensagem: 'Professor não encontrado'
        });
    }

    res.json(professor);
};

exports.insertProfessor = (req, res) => {

    const novoProfessor = Professor.criar(req.body);

    res.status(201).json({
        mensagem: 'Professor cadastrado com sucesso',
        professor: novoProfessor
    });
};

exports.updateProfessor = (req, res) => {

    const professorAtualizado = Professor.atualizar(
        req.params.id,
        req.body
    );

    if (!professorAtualizado) {

        return res.status(404).json({
            mensagem: 'Professor não encontrado'
        });
    }

    res.json({
        mensagem: 'Professor atualizado com sucesso',
        professor: professorAtualizado
    });
};

exports.deleteProfessor = (req, res) => {

    const professorRemovido = Professor.excluir(req.params.id);

    if (!professorRemovido) {

        return res.status(404).json({
            mensagem: 'Professor não encontrado'
        });
    }

    res.json({
        mensagem: 'Professor excluído com sucesso',
        professor: professorRemovido
    });
};