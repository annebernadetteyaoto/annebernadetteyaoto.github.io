
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecast = document.getElementById("forecast");
const updated = document.getElementById("weather-updated");

// Approximate Františkov, Liberec coordinates
const latitude = 50.770;
const longitude = 15.035;

const weatherConditions = {
    0: { label: "Clear sky", icon: "☀" },
    1: { label: "Mainly clear", icon: "🌤" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁" },
    45: { label: "Foggy", icon: "🌫" },
    48: { label: "Rime fog", icon: "🌫" },
    51: { label: "Light drizzle", icon: "🌦" },
    53: { label: "Drizzle", icon: "🌦" },
    55: { label: "Heavy drizzle", icon: "🌧" },
    61: { label: "Light rain", icon: "🌧" },
    63: { label: "Moderate rain", icon: "🌧" },
    65: { label: "Heavy rain", icon: "🌧" },
    71: { label: "Light snow", icon: "🌨" },
    73: { label: "Moderate snow", icon: "❄" },
    75: { label: "Heavy snow", icon: "❄" },
    77: { label: "Snow grains", icon: "❄" },
    80: { label: "Rain showers", icon: "🌦" },
    81: { label: "Moderate showers", icon: "🌧" },
    82: { label: "Heavy showers", icon: "🌧" },
    85: { label: "Snow showers", icon: "🌨" },
    86: { label: "Heavy snow showers", icon: "❄" },
    95: { label: "Thunderstorm", icon: "⛈" },
    96: { label: "Thunderstorm with hail", icon: "⛈" },
    99: { label: "Severe thunderstorm", icon: "⛈" }
};

function getWeather(code) {
    return weatherConditions[code] || {
        label: "Unknown conditions",
        icon: "☁"
    };
}

function formatForecastDay(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short"
    }).format(date);
}

function renderForecast(data) {
    forecast.innerHTML = "";

    // Show the next four days, excluding today
    for (let i = 1; i < 5; i++) {
        const condition = getWeather(data.daily.weather_code[i]);

        const item = document.createElement("div");
        item.className = "forecast-item";

        item.innerHTML = `
            <span class="forecast-day">
                ${formatForecastDay(data.daily.time[i])}
            </span>

            <span class="forecast-condition">
                ${condition.icon} ${condition.label}
            </span>

            <span class="forecast-temperature">
                ${Math.round(data.daily.temperature_2m_max[i])}°
                <span>${Math.round(data.daily.temperature_2m_min[i])}°</span>
            </span>
        `;

        forecast.appendChild(item);
    }
}

async function fetchWeather() {
    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.search = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "weather_code",
            "wind_speed_10m"
        ].join(","),
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min"
        ].join(","),
        timezone: "Europe/Prague",
        forecast_days: "5"
    });

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather request failed");
        }

        const data = await response.json();
        const current = data.current;

        const condition = getWeather(current.weather_code);

        weatherIcon.textContent = condition.icon;
        temperature.textContent =
            `${Math.round(current.temperature_2m)}°`;

        description.textContent = condition.label;

        feelsLike.textContent =
            `${Math.round(current.apparent_temperature)}°C`;

        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        wind.textContent =
            `${Math.round(current.wind_speed_10m)} km/h`;

        renderForecast(data);

        updated.textContent =
            `UPDATED ${new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
            })}`;

    } catch (error) {
        console.error("Weather error:", error);

        description.textContent = "Weather unavailable";
        forecast.innerHTML =
            '<div class="forecast-placeholder">Unable to load forecast.</div>';
    }
}

fetchWeather();

// Refresh weather every 15 minutes
setInterval(fetchWeather, 15 * 60 * 1000);
