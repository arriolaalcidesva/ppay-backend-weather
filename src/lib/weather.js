const fetch  = require('node-fetch');
const config = require('config');
const createError = require('http-errors');

const {
  isHttpError
} = require('./http.js');

const {
  apiKey,
  baseUrl
} = config.get('openWeather');

/**
 * Make a request to openweather.com and get current conditions of a city.
 * @param {string} city
 * @returns {promise}
 */
const getWeatherByCity = async (cityName)=>{

  const url = encodeURI(`${baseUrl}/weather?q=${cityName}&appid=${apiKey}`);
  const result = await fetch(url);

  const {
    status
  } = result;

  //Check if the request is not success, launch a exception.
  if (status&&isHttpError(status))
    throw createError(status,`Request not succes - url:${url}`);

  return await result.json();

}

/**
 * Make a request to openweather.com and get current conditions of a city.
 * @param {string} city
 * @returns {promise}
 */
const getForecastByCity = async (cityName)=>{

  const url = encodeURI(`${baseUrl}/forecast?q=${cityName}&appid=${apiKey}`);
  const result = await fetch(url);

  const {
    status
  } = result;  

  //Check if the request is not success, launch a exception.
  if (status&&isHttpError(status))
    throw createError(result.status,`Request not succes - url:${url}`);

  return await result.json();

}

module.exports = {
  getWeatherByCity,
  getForecastByCity
};