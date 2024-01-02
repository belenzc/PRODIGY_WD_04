const API_KEY = 'GyXd8GtLNYI175cG2XMJV4OwA00Axk9q';

// Get daily forecast
const getDailyForecast = async (id) => {
    const baseUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
    const query = `${id}?apikey=${API_KEY}&metric=true`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    return data.DailyForecasts[0];
}

// Get current weather information
const getCurrentWeather = async (id) => {
    console.log(id);
    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${API_KEY}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    return data[0];
};

// Get city information
const getCity = async (city) => {
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${API_KEY}&q=${city}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    return data[0];
};