let listaDeNumerosSorteados = [];
let dificuldade = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exiberTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    exiberTextoNaTela("h1", "Jogo do número secreto");
    exiberTextoNaTela("p", "Escolha um número entre 1 e " + dificuldade);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto){
        exiberTextoNaTela("h1", "Acertou!!!!");
        let palavraTentativa = tentativas > 1 ? " tentativas!":" tentativa!";
        let mensagemTentativas = "Parabens, você descobriu o número secreto com " + tentativas + palavraTentativa
        exiberTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto){
            exiberTextoNaTela("p", "Errou, o número é menor que o seu chute")
        } else {
            exiberTextoNaTela("p", "Errou, o número é maior que o seu chute")
        }
        tentativas++;
        limparCampo()
    }
}

function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == dificuldade){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value ="";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}