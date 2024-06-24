const apiKey = "7e8f2c64e22442cfe65c212153773d9e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + '&appid=' + apiKey);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".forecast").style.display = "none";
        searchBox.value = ""; 
    }
    else{
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display ="block";
        document.querySelector(".error").style.display = "none";

        searchBox.value = ""; 

        checkForecast(city);
    }
}

async function checkForecast(city) {
    const response = await fetch(forecastUrl + city + '&appid=' + apiKey);

    if(response.status == 200) {
        const data = await response.json();
        const forecastContainer = document.querySelector(".forecast-container");
        forecastContainer.innerHTML = "";

        for (let i = 0; i < data.list.length; i += 8) {
            const day = data.list[i];
            const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric"
            });
            const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
            const temp = Math.round(day.main.temp) + "°c";

            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p>${date}</p>
                    <img src="${icon}" alt="${day.weather[0].description}">
                    <p>${temp}</p>
                </div>
            `;
        }

        document.querySelector(".forecast").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});






