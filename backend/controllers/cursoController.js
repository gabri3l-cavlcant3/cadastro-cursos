const Curso = require('../models/Curso');

exports.getCursos = (req, res) => {
    const cursos = Curso.listar();
    res.json(cursos);
};

exports.getCurso = (req, res) => {
    const curso = Curso.buscarPorId(req.params.id);

    if (!curso) {
        return res.status(404).json({
            mensagem: 'Curso não encontrado'
        });
    }

    res.json(curso);
};

exports.insertCurso = (req, res) => {
    const novoCurso = Curso.criar(req.body);

    res.status(201).json({
        mensagem: 'Curso cadastrado com sucesso',
        curso: novoCurso
    });
};

exports.updateCurso = (req, res) => {
    const cursoAtualizado = Curso.atualizar(req.params.id, req.body);

    if (!cursoAtualizado) {
        return res.status(404).json({
            mensagem: 'Curso não encontrado'
        });
    }

    res.json({
        mensagem: 'Curso atualizado com sucesso',
        curso: cursoAtualizado
    });
};

exports.deleteCurso = (req, res) => {
    const cursoRemovido = Curso.excluir(req.params.id);

    if (!cursoRemovido) {
        return res.status(404).json({
            mensagem: 'Curso não encontrado'
        });
    }

    res.json({
        mensagem: 'Curso excluído com sucesso',
        curso: cursoRemovido
    });
};