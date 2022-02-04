const cep = document.querySelector("#cep");
const resultado = document.querySelector("#resultado");
const botao = document.querySelector("#consultar");



function consultaEndereco(){

    resultado.classList.remove("off");
  
    if(cep.value.length !== 8){
        resultado.innerHTML = `<p>CEP inválido!</p>`;
        resultado.classList.remove("resultado");
        resultado.classList.add("resultado-erro");
        cep.value = "";
        return;
    }
  
    let url = `https://viacep.com.br/ws/${cep.value}/json/`;

    fetch(url).then(resposta => {
        resposta.json().then(dados => {
            mostraDados(dados);
        })
    });
};

function mostraDados(dados){

    if(dados.erro){
        resultado.classList.add("erro");
        resultado.innerHTML = "Não foi possível localizar o endereço!";
        resultado.classList.remove("resultado");
        resultado.classList.add("resultado-erro");
        cep.value = "";

    }else{

        resultado.classList.add("resultado");
        resultado.classList.remove("resultado-erro");

        resultado.innerHTML = `
                           <p class="resultado-titulo">Rua:</p>
                           <p class="resultado-valor">${dados.logradouro}</p>

                           <p class="resultado-titulo">Complemento:</p>
                           <p class="resultado-valor">${dados.complemento ? dados.complemento : "Indisponível"}</p>

                           <p class="resultado-titulo">Bairro:</p>
                           <p class="resultado-valor">${dados.bairro}</p>

                           <p class="resultado-titulo">Cidade:</p>
                           <p class="resultado-valor">${dados.localidade} </p>
                           `;
    }
};

botao.addEventListener("click", consultaEndereco);
