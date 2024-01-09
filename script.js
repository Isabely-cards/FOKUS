const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const text = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const btnComecar = document.getElementById('start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const pauseOuPlay = document.querySelector('.app__card-primary-butto-icon')
const timer = document.getElementById('timer')
const mscInput = document.getElementById('alternar-musica')
const msc = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 25
let intervaloId = null
msc.loop = true


mscInput.addEventListener('change', () => { //código usa um ouvinte de evento (addEventListener) para monitorar o evento de mudança (change) no elemento referenciado por mscInput
    if (msc.paused) {
        msc.play()
    } else {
        msc.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 25
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 15
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 30
    alterarContexto('descanso-longo')
    longBt.classList.add('active')

})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            text.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
            break;
        case 'descanso-curto':
            text.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">faça uma pausa curta!</strong>
        `
            break;
        case 'descanso-longo':
            text.innerHTML = `Hora de voltar à sperfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado') // cria um novo evento customizado
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

btnComecar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    pauseOuPlay.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    pauseOuPlay.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()