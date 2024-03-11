const {
    getCity,
    getLocation
  } = require('../lib/ipdata.js');
  
  const {
    getWeatherByCity
  } = require('../lib/weather.js');
  
  /**
   * Get the current city and wather conditions.
   * @param {boolean} city return city flag. 
   * @returns {Promise}.
   */
  const fetchConditions = async (city=false, ip)=>{
  
    //Get the current city or the location info.
    const location = await (city?getCity():getLocation(ip));
    
    //Get the city name.
    const cityName = city?location:location.city;
  
    //Get the weather condition of the city.
    const weatherInfo = await getWeatherByCity(cityName);
  
    return {
      city: location,
      weather: weatherInfo
    };
  
  };
  
  module.exports = {
    fetchConditions
  };