const logger = require('pino')();

const {
  fetchLocation
} = require('../../services/location.js');

/**
 * Location controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const location = async (req,res, next)=>{

  try {

    //Extract request IP.
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger.info({url: req.url, method: req.method, message:`Location request`, ipFrom: ip});

    //Get current ip location info, from ipapi.co
    const location = await fetchLocation(ip);
    res.status(200).json(location);

  } catch (error) {

    //Send to error middleware.
    next(error);
   
  }

};

module.exports = location;