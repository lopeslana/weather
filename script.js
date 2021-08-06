
let now = new Date();
let day = ["Sundat", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let mes = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dayAt = day[now.getDay()];
let mesAt = mes[now.getMonth()];
let dayDomes = now.getDate();

document.querySelector(".busca").addEventListener('submit', async (event) => {
    event.preventDefault();

    let imput = document.querySelector('#searchInput').value;

    if (imput !== "") {
        clearInfo();
        showWarning('Loading');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(imput)}&appid=e39e7e6a3977b4fe61d0d8d978afbfe0&units=metric`;
   

        let resuts = await fetch(url);
        let json = await resuts.json();

        console.log(url);

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                party: json.weather[0].description,
                sens: json.main.feels_like,
                min: json.main.temp_min,
                max: json.main.temp_max,
                hum: json.main.humidity
            });
        } else {
            clearInfo();
            showWarning('Não foi possível localizar a cidade informada.');
        }
    } else {
        clearInfo();
    }
});

function clearInfo() {
    showWarning('');
    document.querySelector(".result").style.display = "none";
}

function showInfo(json) {
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${Math.round(json.temp)} <sup>ºC<sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h<span>`;
    document.querySelector('.dvl img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector(".sensasao-termica").innerHTML = `Feels like: ${Math.round(json.sens)}º`;
    document.querySelector("#min").innerHTML = `Min ${Math.round(json.min)}º`;
    document.querySelector("#max").innerHTML = `Max ${Math.round(json.max)}º`;
    document.querySelector(".hu").innerHTML = `${Math.round(json.hum)}%`;
    document.querySelector(".month").innerHTML =`${dayDomes}th,  ${mesAt}`;
    document.querySelector('.pc').innerHTML = `${json.party}`;
    document.querySelector('.d').innerHTML = dayAt;
    document.querySelector(".result").style.display = "block";
};

function showWarning(aviso) {
    document.querySelector('.aviso').innerHTML = aviso;
}
