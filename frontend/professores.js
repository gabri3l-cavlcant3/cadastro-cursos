// Variáveis globais
let professores = []
let currentProfessorId = null

// Função para abrir modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block'
}

// Função para fechar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'
}

// Evento de clique no botão de inclusão
const btnAddProfessor = document.getElementById('addProfessor')

if (btnAddProfessor) {
    btnAddProfessor.addEventListener('click', function () {
        currentProfessorId = null
        document.getElementById('professorForm').reset()
        openModal('professorModal')
    })
}

// Evento para fechar modais
document.querySelectorAll('.close').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        closeModal(this.closest('.modal').id)
    })
})

// Funções para Professores
function renderProfessores() {
    const tbody = document.querySelector('#professoresTable tbody')

    tbody.innerHTML = ''

    fetch('http://localhost:3000/professores')
        .then(response => response.json())
        .then(profs => {

            professores = profs

            console.log(profs)

            profs.forEach((professor, index) => {
                const row = document.createElement('tr')

                row.innerHTML = `
                    <td>${professor.codigo}</td>
                    <td>${professor.nomeprofessor}</td>
                    <td>${professor.emailprofessor}</td>
                    <td>
                        <button onclick="editProfessor(${index})">Editar</button>
                        <button onclick="deleteProfessor(${index})">Excluir</button>
                    </td>
                `

                tbody.appendChild(row)
            })
        })
}

function addProfessor(codigo, nomeprofessor, emailprofessor) {
    let professor = {
        codigo,
        nomeprofessor,
        emailprofessor
    }

    fetch('http://localhost:3000/professores',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(professor)
        })
        .then(response => response.json())
        .then(dados => {
            console.log(dados)
            renderProfessores()
        })
}

function editProfessor(index) {
    const professor = professores[index]

    document.getElementById('codigo').value = professor.codigo
    document.getElementById('nomeprofessor').value = professor.nomeprofessor
    document.getElementById('emailprofessor').value = professor.emailprofessor

    currentProfessorId = professor.codigo

    openModal('professorModal')
}

function deleteProfessor(index) {
    const professor = professores[index]

    if (confirm('Tem certeza que deseja excluir este professor?')) {
        fetch(`http://localhost:3000/professores/${professor.codigo}`,
            {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(dados => {
                console.log(dados)
                renderProfessores()
            })
    }
}

const professorForm = document.getElementById('professorForm')

if (professorForm) {
    professorForm.addEventListener('submit', function (e) {
        e.preventDefault()

        const codigo = document.getElementById('codigo').value
        const nomeprofessor = document.getElementById('nomeprofessor').value
        const emailprofessor = document.getElementById('emailprofessor').value

        if (currentProfessorId) {
            fetch(`http://localhost:3000/professores/${currentProfessorId}`,
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        codigo,
                        nomeprofessor,
                        emailprofessor
                    })
                })
                .then(response => response.json())
                .then(dados => {
                    console.log(dados)
                    closeModal('professorModal')
                    renderProfessores()
                })
        } else {
            addProfessor(codigo, nomeprofessor, emailprofessor)
            closeModal('professorModal')
        }
    })
}

document.addEventListener('DOMContentLoaded', function () {
    renderProfessores()
})