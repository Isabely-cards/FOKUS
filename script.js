const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const text = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longBt.classList.add('active')

})

function alterarContexto(contexto) {
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