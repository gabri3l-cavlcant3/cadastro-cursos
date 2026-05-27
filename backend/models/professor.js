const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(
    __dirname,
    '..',
    'public',
    'professores.json'
);

function listar() {

    if (!fs.existsSync(caminhoArquivo)) {
        fs.writeFileSync(caminhoArquivo, '[]');
    }

    const dados = fs.readFileSync(caminhoArquivo, 'utf-8');

    return JSON.parse(dados);
}

function salvar(professores) {

    fs.writeFileSync(
        caminhoArquivo,
        JSON.stringify(professores, null, 4)
    );
}

module.exports = {

    listar,

    buscarPorId(id) {

        const professores = listar();

        return professores.find(
            professor => professor.id === Number(id)
        );
    },

    criar(novoProfessor) {

        const professores = listar();

        const professor = {

            id: professores.length > 0
                ? Math.max(
                    ...professores.map(
                        professor => professor.id
                    )
                ) + 1
                : 1,

            nome: novoProfessor.nome,
            email: novoProfessor.email,
            sala: novoProfessor.sala
        };

        professores.push(professor);

        salvar(professores);

        return professor;
    },

    atualizar(id, dadosAtualizados) {

        const professores = listar();

        const indice = professores.findIndex(
            professor => professor.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        professores[indice] = {
            ...professores[indice],
            ...dadosAtualizados,
            id: Number(id)
        };

        salvar(professores);

        return professores[indice];
    },

    excluir(id) {

        const professores = listar();

        const indice = professores.findIndex(
            professor => professor.id === Number(id)
        );

        if (indice === -1) {
            return null;
        }

        const professorRemovido =
            professores.splice(indice, 1)[0];

        salvar(professores);

        return professorRemovido;
    }
};