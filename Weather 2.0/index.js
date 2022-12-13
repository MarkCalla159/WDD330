const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wPart = wrapper.querySelector(".weather-part"),
//wDeg = wPart.querySelector(".wind .deg"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=15041fab27fe6eb7099d4db42183d572`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=15041fab27fe6eb7099d4db42183d572`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description} = info.weather[0];
        const {temp, feels_like, humidity, pressure} = info.main;
        const {speed, deg} = info.wind;
        
        //if(deg > 348.75 && deg <= 11.25){
            //wDeg = "N";
        //}else if(deg > 11.25 && deg <= 33.75){
            //wDeg = "NNE";
        //}else if(deg > 33.75 && deg <= 56.25){
            //wDeg = "NE";
        //}else if(deg > 56.25 && deg <= 78.25){
            //wDeg = "ENE";
        //}else if(deg > 78.25 && deg <= 101.25){
            //wDeg = "E";
        //}else if(deg > 101.25 && deg <= 123.75){
            //wDeg = "ESE";
        //}else if(deg > 123.75 && deg <= 146.25){
            //wDeg = "SE";
        //}else if(deg > 146.25 && deg <= 168.75){
            //wDeg = "SSE";
        //}else if(deg > 168.75 && deg <= 191.25){
            //wDeg = "S";
        //}else if(deg > 191.25 && deg <= 213.75){
            //wDeg = "SSW";
        //}else if(deg > 213.75 && deg <= 236.25){
            //wDeg = "SW";
        //}else if(deg > 236.25 && deg <= 258.75){
            //wDeg = "WSW";
        //}else if(deg > 258.75 && deg <= 281.25){
            //wDeg = "W";
        //}else if(deg > 281.25 && deg <= 303.75){
            //wDeg = "WNW";
        //}else if(deg > 303.75 && deg <= 326.25){
            //wDeg = "NW";
        //}else if(deg > 326.25 && deg <= 348.75){
            //wDeg = "NNW";
        //}

        wPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        wPart.querySelector(".weather").innerText = description;
        wPart.querySelector(".location span").innerText = `${city}, ${country}`;
        wPart.querySelector(".wind .speed").innerText = Math.floor(speed);
        wPart.querySelector(".wind .deg").innerText = `${deg}`;
        wPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wPart.querySelector(".humidity span").innerText = `${humidity}%`;
        wPart.querySelector(".pressure span").innerText = `${pressure}`;

        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});