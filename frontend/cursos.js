// Variáveis globais
let cursos = []
let currentCursoId = null

// Função para abrir modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block'
}

// Função para fechar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'
}

// Evento de clique no botão de inclusão
const btnAddCurso = document.getElementById('addCurso')

btnAddCurso.addEventListener('click', function () {
    currentCursoId = null
    document.getElementById('cursoForm').reset()
    openModal('cursoModal')
})

// Event listeners para fechar modais
document.querySelectorAll('.close').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        closeModal(this.closest('.modal').id)
    })
})

// Funções para Cursos
function renderCursos() {
    const tbody = document.querySelector('#cursosTable tbody')
    tbody.innerHTML = ''

    fetch('http://localhost:3000/cursos')
        .then(response => response.json())
        .then(dados => {
            cursos = dados

            cursos.forEach((curso, index) => {
                const row = document.createElement('tr')

                row.innerHTML = `
                    <td>${curso.nome}</td>
                    <td>${curso.sigla}</td>
                    <td>${curso.coordenador}</td>
                    <td>
                        <button onclick="editCurso(${index})">Editar</button>
                        <button onclick="deleteCurso(${index})">Excluir</button>
                    </td>
                `

                tbody.appendChild(row)
            })
        })
}

function addCurso(nome, sigla, descricao, coordenador) {
    let curso = {
        nome,
        sigla,
        descricao,
        coordenador
    }

    fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(curso)
    })
        .then(response => response.json())
        .then(dados => {
            console.log(dados)
            renderCursos()
        })
}

function editCurso(index) {
    const curso = cursos[index]

    document.getElementById('nome').value = curso.nome
    document.getElementById('sigla').value = curso.sigla
    document.getElementById('descricao').value = curso.descricao
    document.getElementById('coordenador').value = curso.coordenador

    currentCursoId = curso.id

    openModal('cursoModal')
}

function deleteCurso(index) {
    const curso = cursos[index]

    if (confirm('Tem certeza que deseja excluir este curso?')) {
        fetch(`http://localhost:3000/cursos/${curso.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(dados => {
                console.log(dados)
                renderCursos()
            })
    }
}

document.getElementById('cursoForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const sigla = document.getElementById('sigla').value
    const descricao = document.getElementById('descricao').value
    const coordenador = document.getElementById('coordenador').value

    if (currentCursoId) {
        fetch(`http://localhost:3000/cursos/${currentCursoId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                sigla,
                descricao,
                coordenador
            })
        })
            .then(response => response.json())
            .then(dados => {
                console.log(dados)
                closeModal('cursoModal')
                renderCursos()
            })
    } else {
        addCurso(nome, sigla, descricao, coordenador)
        closeModal('cursoModal')
    }
})

document.addEventListener('DOMContentLoaded', function () {
    renderCursos()
})