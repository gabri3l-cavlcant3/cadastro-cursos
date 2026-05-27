const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '..', 'public', 'cursos.json');

function listar() {
    const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
}

function salvar(cursos) {
    fs.writeFileSync(caminhoArquivo, JSON.stringify(cursos, null, 4));
}

module.exports = {

    listar,

    buscarPorId(id) {
        const cursos = listar();

        return cursos.find(curso => curso.id === Number(id));
    },

    criar(novoCurso) {

        const cursos = listar();

        const curso = {
            id: cursos.length > 0
                ? Math.max(...cursos.map(curso => curso.id)) + 1
                : 1,

            nome: novoCurso.nome,
            sigla: novoCurso.sigla,
            descricao: novoCurso.descricao,
            coordenador: novoCurso.coordenador
        };

        cursos.push(curso);

        salvar(cursos);

        return curso;
    },

    atualizar(id, dadosAtualizados) {

        const cursos = listar();

        const indice = cursos.findIndex(
            curso => curso.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        cursos[indice] = {
            ...cursos[indice],
            ...dadosAtualizados,
            id: Number(id)
        };

        salvar(cursos);

        return cursos[indice];
    },

    excluir(id) {

        const cursos = listar();

        const indice = cursos.findIndex(
            curso => curso.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        const cursoRemovido = cursos.splice(indice, 1)[0];

        salvar(cursos);

        return cursoRemovido;
    }
};