const logger = require('pino')();

const {
  fetchForecast
} = require('../../services/forecast.js');

/**
 * Forecast controller.
 * @param {object} req request object.
 * @param {object} res response object.
 * @returns {Promise}.
 */
const forecast = async (req,res,next,city=false)=>{

  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.info({url: req.url, method: req.method, message:`Forecast request - city:${city}`});

    const response = await fetchForecast(city,ip);
    res.status(200).json(response);

  } catch (error) {
    
    //Send to error middleware.
    next(error);
   
  }

};

module.exports = forecast;