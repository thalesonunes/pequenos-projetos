const cep = document.querySelector("#cep");
const resultado = document.querySelector("#resultado");
const botao = document.querySelector("#consultar");



function consultaEndereco() {

    resultado.classList.remove("off");
    cep.focus();

    if (cep.value.length !== 8) {
        resultado.innerHTML = `<p>Digite um CEP válido!</p>`;
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

function mostraDados(dados) {

    if (dados.erro) {
        resultado.classList.add("erro");
        resultado.innerHTML = `<p>Não foi possível localizar o endereço!</p><p>Digite um CEP válido!</p>`;
        resultado.classList.remove("resultado");
        resultado.classList.add("resultado-erro");
        cep.value = "";

    } else {

        resultado.classList.add("resultado");
        resultado.classList.remove("resultado-erro");

        resultado.innerHTML = ` <h3>CEP: ${dados.cep}</h3>
                           <p class="resultado-titulo">Rua:</p>
                           <p class="resultado-valor">${dados.logradouro ? dados.logradouro : "-"}</p>

                           <p class="resultado-titulo">Complemento:</p>
                           <p class="resultado-valor">${dados.complemento ? dados.complemento : "-"}</p>

                           <p class="resultado-titulo">Bairro:</p>
                           <p class="resultado-valor">${dados.bairro ? dados.bairro : "-"}</p>

                           <p class="resultado-titulo">Cidade:</p>
                           <p class="resultado-valor">${dados.localidade ? dados.localidade : "-"} </p>

                           <p class="resultado-titulo">Estado:</p>
                           <p class="resultado-valor">${dados.uf ? dados.uf : "-"} </p>
                           `;
    }

    cep.value = "";
};

botao.addEventListener("click", consultaEndereco);

cep.addEventListener("keyup", e => {
    if (e.key == "Enter") {
        consultaEndereco()
    }
})