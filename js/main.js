const cityForm = document.querySelector('form');
const card = document.querySelector('.currentWeather');
const cover = document.querySelector('img.cover');
const icon = document.querySelector('.currentWeather .icon img');
const details = document.querySelector('.details');
const dailyForecastDiv = document.querySelector('.dailyForecast');

const updateUI = (data) => {
    // Destructure properties
    const { cityDets, weather, dailyForecast } = data;

    const dayFC = dailyForecast.Day;
    const nightFC = dailyForecast.Night;
    const tempC = dailyForecast.Temperature;

    // Update daily forecast template
    dailyForecastDiv.innerHTML = /* html */ `
        <div class="day-forecast card bg-light shadow text-center">
            <h6>DAY</h6>
            <img src="css/imgs/icons/${dayFC.Icon}.svg" alt="Forecast of the day icon">
            <span class="fw-bold">${dayFC.IconPhrase}</span>
            <span class="precipitations">
        </div>
        <div class="night-forecast card bg-light shadow text-center">
            <h6>NIGHT</h6>
            <img src="css/imgs/icons/${nightFC.Icon}.svg" alt="Forecast of the night icon">
            <span class="fw-bold">${nightFC.IconPhrase}</span>
            <span class="precipitations">
        </div>
        <div class="minMax-temp card bg-light shadow mx-auto text-center">
            <span  class="fw-semibold">Max: ${tempC.Maximum.Value}&deg; - Min: ${tempC.Minimum.Value}&deg;</span>
        </div>
    `;

    const dayPrecipitations = document.querySelector('.day-forecast .precipitations');
    const nightPrecipitations = document.querySelector('.night-forecast .precipitations');

    if (dayFC.HasPrecipitation) {
        dayPrecipitations.innerHTML = `${dayFC.PrecipitationIntensity} ${dayFC.PrecipitationType}`;
    } else {
        dayPrecipitations.innerHTML = "No Precipitations";
    }

    if (nightFC.HasPrecipitation) {
        nightPrecipitations.innerHTML = `${nightFC.PrecipitationIntensity} ${nightFC.PrecipitationType}`;
    } else {
        nightPrecipitations.innerHTML = "No Precipitations";
    }

    // Update details template
    details.innerHTML = /* html */ `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}&deg;</span>
        </div>
    `;

    // Update the night/day & icon images
    let coverSrc = weather.IsDayTime ? 'css/imgs/day.svg' : 'css/imgs/night.svg';
    cover.setAttribute('src', coverSrc);

    const iconSrc = `css/imgs/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // Remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    if (dailyForecastDiv.classList.contains('d-none')) {
        dailyForecastDiv.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getCurrentWeather(cityDets.Key);
    const dailyForecast = await getDailyForecast(cityDets.Key);

    return { cityDets, weather, dailyForecast };
};

cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    document.querySelector('.container').style.gridTemplateColumns = "300px 400px";

    // Update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})