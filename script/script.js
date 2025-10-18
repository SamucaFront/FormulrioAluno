class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome
    this.idade = idade
    this.curso = curso
    this.notaFinal = notaFinal
  }

  isAprovado() {
    return this.notaFinal >= 7
  }

  toString() {
    return `${this.nome} (${this.curso}) - Nota: ${this.notaFinal} - ${this.isAprovado() ? 'Aprovado' : 'Reprovado'}`
  }
}

let alunos = []
let editIndex = -1

const form = document.getElementById('formAluno')
const tabela = document.querySelector('#tabelaAlunos tbody')
const relatorio = document.getElementById('relatorio')

// Cadastrar ou Editar
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const nome = document.getElementById('nome').value
  const idade = Number(document.getElementById('idade').value)
  const curso = document.getElementById('curso').value
  const notaFinal = Number(document.getElementById('notaFinal').value)

  if (editIndex === -1) {
    alunos.push(new Aluno(nome, idade, curso, notaFinal))
    alert('Aluno cadastrado!')
  } else {
    alunos[editIndex] = new Aluno(nome, idade, curso, notaFinal)
    alert('Aluno atualizado!')
    editIndex = -1
  }

  form.reset()
  renderTabela()
})

// Renderizar tabela
const renderTabela = () => {
  tabela.innerHTML = ''
  alunos.forEach((aluno, index) => {
    const row = tabela.insertRow()
    row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      </td>
    `
  })
}

const editar = (index) => {
  const aluno = alunos[index]
  document.getElementById('nome').value = aluno.nome
  document.getElementById('idade').value = aluno.idade
  document.getElementById('curso').value = aluno.curso
  document.getElementById('notaFinal').value = aluno.notaFinal
  editIndex = index
}

const excluir = (index) => {
  if (confirm('Deseja excluir este aluno?')) {
    alunos.splice(index, 1)
    renderTabela()
    alert('Aluno excluído!')
  }
}

// Relatórios
const listarAprovados = () => {
  const aprovados = alunos.filter(a => a.isAprovado())
  relatorio.innerHTML = `<p>Aprovados: ${aprovados.map(a => a.nome).join(', ')}</p>`
}

const mediaNotas = () => {
  if (alunos.length === 0) return alert('Sem alunos cadastrados!')
  const media = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length
  relatorio.innerHTML = `<p>Média das notas: ${media.toFixed(2)}</p>`
}

const mediaIdades = () => {
  if (alunos.length === 0) return alert('Sem alunos cadastrados!')
  const media = alunos.reduce((acc, a) => acc + a.idade, 0) / alunos.length
  relatorio.innerHTML = `<p>Média das idades: ${media.toFixed(2)}</p>`
}

const ordenarNomes = () => {
  const nomes = alunos.map(a => a.nome).sort()
  relatorio.innerHTML = `<p>Alunos em ordem alfabética: ${nomes.join(', ')}</p>`
}

const contarPorCurso = () => {
  const contagem = alunos.reduce((acc, a) => {
    acc[a.curso] = (acc[a.curso] || 0) + 1
    return acc
  }, {})
  relatorio.innerHTML = `<p>Quantidade por curso: ${JSON.stringify(contagem)}</p>`
}
