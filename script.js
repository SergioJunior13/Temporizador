var inputHora = document.getElementById("horas")
var inputMinuto = document.getElementById("minutos")
var inputSegundo = document.getElementById("segundos")
var divInputs = document.getElementById("inputs")
var divResultado = document.getElementById("divResultado")
var resultado = document.getElementById("resultado")
var titulo = document.getElementsByTagName("title")[0]

btnIniciar = document.getElementById("btnIniciar")
btnPausar = document.getElementById("btnPausar")

var segundos
var minutos
var horas

var dataAtual
var dataFinal
var loop
var diferenca = 0

var som = new Audio("alarme.mp3")

function verificar(evento) {
    var input = evento.currentTarget
    var inputValue = input.value
    if (inputValue < 0 || inputValue > 59 || isNaN(inputValue)) {
        input.value = "00"
    }
}

function iniciar() {
    btnIniciar.disabled = true
    btnPausar.disabled = false
    divResultado.classList = ""
    divInputs.classList = "hidden"

    var tempoHora = inputHora.value * 60 * 60 * 1000
    var tempoMinuto = inputMinuto.value * 60 * 1000
    if (diferenca == 0) {
        var tempoSegundo = (inputSegundo.value * 1000) + 1000
    }
    else {
        var tempoSegundo = (inputSegundo.value * 1000)
    }

    dataFinal = new Date().getTime() + (tempoHora + tempoMinuto + tempoSegundo) + diferenca
    loop = setInterval(contarTempo, 10)
}

function contarTempo() {
    dataAtual = new Date().getTime()
    diferenca = dataFinal - dataAtual

    if (diferenca < 1000) {
        som.play()
    }
    if (diferenca > 0) {

        var diferencaSegundos = Math.floor(diferenca / 1000)
        var diferencaMinutos = Math.floor(diferencaSegundos / 60)
        var diferencaHoras = Math.floor(diferencaMinutos / 60)

        segundos = formatar(calcularTempo(diferencaSegundos, 60))
        minutos = formatar(calcularTempo(diferencaMinutos, 60))
        horas = formatar(calcularTempo(diferencaHoras, 60))

        resultado.innerHTML = `${horas}:${minutos}:${segundos}`
        titulo.innerHTML = `${horas}:${minutos}:${segundos}`
    }
    else {
        clearInterval(loop)
    }
}


function pausar() {
    btnPausar.disabled = true
    clearInterval(loop)
    btnIniciar.disabled = false
    inputHora.value = "00"
    inputMinuto.value = "00"
    inputSegundo.value = "00"
}
function resetar() {
    clearInterval(loop)
    diferenca = 0
    resultado.innerHTML = "00:00:00"
    titulo.innerHTML = "00:00:00"
    inputHora.value = "00"
    inputMinuto.value = "00"
    inputSegundo.value = "00"

    btnIniciar.disabled = false
    btnPausar.disabled = false

    divResultado.classList = "hidden"
    divInputs.classList = "inputs"
    som.pause()
}

function calcularTempo(tempo, numero) {
    return tempo - (numero * Math.floor(tempo / numero))
}

function formatar(numero) {
    if (numero < 10) {
        numero = "0" + numero;
    }
    return numero;
}
