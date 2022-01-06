// Referenciando todos os elementos necessários para a manipulação da calculadora
const displayValorAnterior = document.getElementById("valor-anterior");
const displayValorAtual = document.getElementById("valor-atual");
const botoesNumeros = document.querySelectorAll(".numero");
const botoesOperadores = document.querySelectorAll(".operador");

const display = new Display(displayValorAnterior, displayValorAtual);

// percorrerá todos os botões com classe ".numero" adicionando um eventListener
// que ao clicar, será passado o texto de cada botão para o "agregarNumero()" da classe Display
botoesNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        display.agregarNumero(botao.innerHTML);
    });
});

// percorrerá todos os botões com classe ".operador" adicionando um eventListener
// que ao clicar, será passado o valor de cada botão para o método "computar()" classe Display.
botoesOperadores.forEach(botao => {
    botao.addEventListener('click', () => {
        display.computar(botao.value);
    });
});

