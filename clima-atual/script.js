const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input-part");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");
const wIcon = wrapper.querySelector(".weather-part img");
const arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup", e => {
    // se o usuario pressionar Enter e o input não estiver vazio
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucess, onError);
    }else{
        alert("Seu navegador não suporta geolocalização!");
    }
});

function onSucess (position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=aa001f11b59d8b8c01294b9b017131ce`;
    fetchData();
}

function onError (error){
    // infoTxt.innerText = error.message;
    infoTxt.innerText = "Ative a geolocalização!";
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=aa001f11b59d8b8c01294b9b017131ce`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Recebendo detalhes do clima...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails (info){
    if(info.cod == "404"){
        infoTxt.innerText = "Cidade não encontrada!";
        infoTxt.classList.replace("pending", "error");
    }else{
        // capturando os dados de info
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        // trocando os icones
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = "icons/rain.svg";
        }

        // preenchendo os textos com os dados capturados
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        // atualizando as classes css
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
    console.log(info);
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

