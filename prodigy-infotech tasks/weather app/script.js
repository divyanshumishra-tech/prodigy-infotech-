const apiKey = "bcebd22f2f194a56a7e9164bbd876460"; // Replace with your OpenWeatherMap API key

document.getElementById("searchBtn").addEventListener("click", () => {
    let city = document.getElementById("city").value;
    if (city) {
        getWeather(city);
    }
});

document.getElementById("locationBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error:", error));
}

function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error:", error));
}

function displayWeather(data) {
    if (data.cod === "404") {
        document.getElementById("weather-result").innerHTML = `<p>City not found</p>`;
        return;
    }

    let weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        <p>${data.weather[0].description}</p>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById("weather-result").innerHTML = weatherHTML;
}
document.getElementById("weather-result").innerHTML = "<p>Loading...</p>";
getWeather("Delhi"); // Default city to display on load