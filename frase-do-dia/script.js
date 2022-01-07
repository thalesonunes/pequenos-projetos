// Referenciando elementos em váriaveis
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".author .name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

// gera frases de froma randômica
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading quote...";
    authorName.innerText = "";

    // buscando citações aleatórias da api e transformando em um objeto Javascript
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    });
}

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

copyBtn.addEventListener("click", () => {
    // copia a frase para área de transferência
    navigator.clipboard.writeText(quoteText.innerText);
});

soundBtn.addEventListener("click", () => {
    // SpeechSynthesisUtterance é uma api de leitura em áudio 
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    
    // define o idioma
    utterance.lang = 'en-US';
    
    // faz a leitura
    speechSynthesis.speak(utterance);
});

quoteBtn.addEventListener("click", randomQuote);

randomQuote();