 document.addEventListener("DOMContentLoaded",()=> {


//    ----------------------   Celulas   ----------------------   
const celulas = document.querySelectorAll(".Celulas");


//    ----------------------   Variaveis    ----------------------   
let jogadorAtual = "X";
let bot = "O"

let turnoBlock = false;
let fim = false;


//    ----------------------   Combinações da vitoria, em forma de lista    ----------------------   
const CombinacaoVitoria = [

    [0,1,2], [3,4,5], [6,7,8], //Horizontal
    [0,3,6], [1,4,7], [2,5,8], //Vertical
    [0,4,8], [2,4,6] //Diagonal
]




//    ----------------------   Funções    ----------------------
const TrocarJogador = function(){
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
}


const clickAleatorio = function(){

    let CelulasVazias = [...celulas].filter((celula) => celula.textContent === "");
    console.log(CelulasVazias);

    let CelulaAleatoriaVazia = CelulasVazias[Math.floor(Math.random()*CelulasVazias.length)];

    CelulaAleatoriaVazia.click();
}


const cheio = function(){
    return [...celulas].every(celulas => celulas.textContent != "")
}

const vencedor = function(){
    for(let Combinacao of CombinacaoVitoria){                      // Logica, combinação é alguma combinação da lista, combinacaoVitoria, primeiro for dela [0,1,2]
        let [a,b,c] = Combinacao;                                  // você basicamente pega eles e faz o comparativo para ver se são 3 X ou O
        if(
            celulas[a].textContent != "" && 
            celulas[a].textContent == celulas[b].textContent &&
            celulas[b].textContent == celulas[c].textContent
        ){
            return celulas[a].textContent
        }
    }
    return undefined

}

const VerificarFaltaUm = function(parametro){
    for(Combinacao of CombinacaoVitoria){
        let [a,b,c] = Combinacao;
        // let [celA, celB, celC] = [a,b,c].map(indice => celulas[indice].textContent) Caso eu precise pegar os valores individualmente, fiz isso só para ver e lembrar da logica
        let valores = [a,b,c].map(indice => celula[indice].textContent);
        
        if(valores.filter(texto => texto == parametro ).length === 2 && valores.filter(valor => valor === "").length == 1){
            let indicevazio = [a,b,c].filter(indice => celulas[indice].textContent === "")
            return celula[indicevazio]
        }
    }
}




//    ----------------------   Nivel do Computador   ----------------------   
let nivel1 = true;
let nivel2 = false;
let nivel3 = false;


//    ----------------------   Computador   ----------------------   
const Computador = function(){
    if(nivel1){
        clickAleatorio()
    }
}




//    --------------------------------------------------   Eventos  ----------------------------------------------------------


//    ----------------------   Click/jogo   ----------------------   
celulas.forEach(celula => {
    celula.addEventListener("click",() => {

        if(fim == false && celula.textContent == "" && turnoBlock == false ) {
            celula.textContent = jogadorAtual;

            if(jogadorAtual != bot){ // Aqui eu travo a entrada no click( para não clicar varias vezes, principalmente na vez do bot)
                turnoBlock = true
            }

            if(vencedor()){
                alert(" Vencedor")
                fim = true
            }

            if(cheio()){
                alert("Houve um empate!")
            }
            
            TrocarJogador();
            
            if(jogadorAtual === bot){
                setTimeout(()=>{
                    turnoBlock = false // Aqui eu despauso o jogo para o Bot jogar
                    Computador();
                }, 400)
            }


        }
    })   
});




















 })
 