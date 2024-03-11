const logger = require('pino')();

const {
  fetchConditions
} = require('../../services/current.js');

/**
 * Current controller.
 * @param {object} req request object.
 * @param {object} res response object.
 * @returns {Promise}.
 */
const current = async (req,res, next, city=false)=>{

  try {
    
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.info({url: req.url, method: req.method, message:`Current request - city:${city}`});
    
    const response = await fetchConditions(city,ip);
    res.status(200).json(response);

  } catch (error) {

    //Send to error middleware.
    next(error);
   
  }

};

module.exports = current;