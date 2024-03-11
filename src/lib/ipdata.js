const ipapi = require('ipapi.co');

/**
 * Return "ipapi.co" location data from the current IP
 * @returns {Promise} Represent ip-api geografic object.
 */
const getLocation = (receiveIp)=>{

  return new Promise((resolve,reject)=>{

    ipapi.location((ipInfo,error)=>{

      if (error)
        reject(error);
      else
        resolve(ipInfo);

    });

  },receiveIp);

}

/**
 * Return "ipapi.co" CITY from the current IP
 * @returns {Promise} Represent ip-api city string.
 */
const getCity = ()=>{

  return new Promise((resolve,reject)=>{

    ipapi.location((city,error)=>{

      if (error)
        reject(error);
      else
        resolve(city);

    },'','','city');

  });

}

module.exports = {
  getLocation,
  getCity
};