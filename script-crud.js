const btnAdiconarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluida = document.getElementById('btn-remover-concluidas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    const imagemDoBotao = document.createElement('img')
    imagemDoBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemDoBotao)

    botao.onclick = () => {
        debugger
        const novoNome = prompt("Qual é o novo nome da tarefa?")
        if(novoNome === '' || novoNome === null){
            alert("Digite uma tarefa válida!")
        }else  {
            paragrafo.textContent = novoNome // atualizar a camada visual, paragrafo
            tarefa.descricao= novoNome //atualizamos a referencia da tarefa, camada de dados
            atualizarTarefas() // damos um set na localStorage
        }
    }

    //append = adiciona no elemento/Bastante utilizado durante o curso, esse método permite adicionar múltiplos nós e/ou strings de texto ao final de um elemento. Se você passar uma string, o método a trata como um texto e a adiciona diretamente.
        li.append(svg)
        li.append(paragrafo)
        li.append(botao)

        if (tarefa.completa) {
            li.classList.add('app__section-task-list-item-complete')
            botao.setAttribute('disabled', 'disabled') 
        }else {
            li.onclick = () => {
                document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
                if(tarefaSelecionada == tarefa) {
                    paragrafoDescricaoTarefa.textContent = ''
                
                    tarefaSelecionada = null
                    liTarefaSelecionada = null
                    return
                }
                tarefaSelecionada = tarefa
                liTarefaSelecionada = li
                paragrafoDescricaoTarefa.textContent = tarefa.descricao
                
                li.classList.add('app__section-task-list-item-active')
            }
        }

        return li
    }

    btnAdiconarTarefa.addEventListener('click', () => {
        formAdicionarTarefa.classList.toggle('hidden')
    })

    formAdicionarTarefa.addEventListener('submit', (e) => {
        e.preventDefault()
        const descricaoTarefa = textArea.value
        const tarefa = {
            descricao: textArea.value
        }
        tarefas.push(tarefa)
        const elementoTarefa = criarElementoTarefa(tarefa)
        ulTarefas.append(elementoTarefa)
        atualizarTarefas()
        textArea.value = ''
        formAdicionarTarefa.classList.add('hidden')
    })

    tarefas.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa)
        ulTarefas.append(elementoTarefa)
    })

    
// Selecione o botão de Cancelar que adicionamos ao formulário
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');

// Crie uma função para limpar o conteúdo do textarea e esconder o formulário
const limparFormulario = () => {
    textArea.value = '';  // Limpe o conteúdo do textarea
    formAdicionarTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
}

// Associe a função limparFormulario ao evento de clique do botão Cancelar
btnCancelar.addEventListener('click', limparFormulario);

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

const RemoverConcluida = () => {
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
    atualizarTarefas()
}

btnRemoverConcluida.onclick = RemoverConcluida