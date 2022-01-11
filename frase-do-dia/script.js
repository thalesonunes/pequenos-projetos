// Referenciando elementos em váriaveis
const title = document.querySelector("#title");
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".author .name");

const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

const portugueseBtn = document.querySelector(".portuguese");
const englishBtn = document.querySelector(".english");

let language = "pt-BR";
let languageSpeed = 0.9;

// gera frases de forma randômica
function randomQuote() {

    quoteBtn.classList.add("loading");
    quoteBtn.innerText = language === "pt-BR" ? "Carregando..." : "Loading quote...";
    authorName.innerText = "";
    title.innerText = language === "pt-BR" ? "Frase do Dia!" : "Quote of the Day!";

    // PORTUGUÊS
    // buscando citações aleatórias de um api firebase - EM PORTUGUES (opção01)
    if (language === "pt-BR") {
        fetch("https://frases-aleatorias-4d34d-default-rtdb.firebaseio.com/frases.json").then(res => res.json()).then(result => {

            const frases = Object.values(result);
            indexAleatorio = Math.floor(Math.random() * frases.length);
         
            frases.forEach(function (item, index) {

                if (index === indexAleatorio) {

                    // console.log(item, index)

                    quoteText.innerText = item.frase;
                    authorName.innerText = item.autor;
                    quoteBtn.innerText = "Nova frase";
                    quoteBtn.classList.remove("loading");
                }
            });
        });

        // // buscando citações aleatórias da api e transformando em um objeto Javascript - EM PORTUGUES (opção02)
        // fetch("https://allugofrases.herokuapp.com/frases/random").then(res => res.json()).then(result =>{
        //     //alert(result);
        //     quoteText.innerText = result.frase;
        //     authorName.innerText = result.autor;
        //     quoteBtn.innerText = "New Quote";
        //     quoteBtn.classList.remove("loading");
        // });

    } else {

        // EM INGLES
        // buscando citações aleatórias da api e transformando em um objeto Javascript - EM INGLES
        fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.innerText = "New Quote";
            quoteBtn.classList.remove("loading");
        });
    }
}

// trocando pra INGLES
englishBtn.addEventListener("click", () => {
    language = "en-US";
    languageSpeed = 0.7;
    englishBtn.classList.add("lang-on");
    portugueseBtn.classList.remove("lang-on");
    randomQuote();
});

// trocando pra PORTUGUES
portugueseBtn.addEventListener("click", () => {
    language = "pt-BR";
    languageSpeed = 0.9;
    portugueseBtn.classList.add("lang-on");
    englishBtn.classList.remove("lang-on");
    randomQuote();
});

// compartilhando via twitter
twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

copyBtn.addEventListener("click", () => {
    // copia a frase para área de transferência
    navigator.clipboard.writeText(quoteText.innerText);
});

soundBtn.addEventListener("click", () => {

    // by ou por
    let authorship = language === "pt-BR" ? "por" : "by";

    // SpeechSynthesisUtterance é uma api de leitura em áudio 
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} ${authorship} ${authorName.innerText}`);

    // define o idioma - pt-BR ou en-US
    utterance.lang = language;
    utterance.rate = languageSpeed;

    // faz a leitura
    speechSynthesis.speak(utterance);
});

quoteBtn.addEventListener("click", randomQuote);

randomQuote();