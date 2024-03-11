//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('weather api - test', ()=>{

  it('getWeatherByCity - 500',async ()=>{

    const {
      getWeatherByCity
    } = proxyquire('../../src/lib/weather.js',{
      'node-fetch':sinon.fake.resolves({status:500,body:'Internal server error'})
    });

    await chai.expect(getWeatherByCity('Buenos Aires')).to.be.rejectedWith('Request not succes');

  });

  it('getWeatherByCity - 404',async ()=>{

    const {
      getWeatherByCity
    } = proxyquire('../../src/lib/weather.js',{
      'node-fetch':sinon.fake.resolves({status:404,body:'Internal server error'})
    });

    await chai.expect(getWeatherByCity('Buenos Aires')).to.be.rejectedWith('Request not succes');

  });

  it('getWeatherByCity - 200',async ()=>{

    const mock = {
      status:200,
      json:sinon.fake.returns({
        coord: { lon: -58.38, lat: -34.61 },
        weather:[{
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n' 
        }]
      })
    };

    const {
      getWeatherByCity
    } = proxyquire('../../src/lib/weather.js',{
      'node-fetch':sinon.fake.resolves(mock)
    });

    const result = await getWeatherByCity('Buenos Aires');
   
    chai.expect(result).to.eql({
      coord: { lon: -58.38, lat: -34.61 },
      weather:[{
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03n' 
      }]
    });

  });  

  it('getForecastByCity - 500',async ()=>{

    const {
      getForecastByCity
    } = proxyquire('../../src/lib/weather.js',{
      'node-fetch':sinon.fake.resolves({status:500,body:'Internal server error'})
    });

    await chai.expect(getForecastByCity('Buenos Aires')).to.be.rejectedWith('Request not succes');

  });

  it('getForecastByCity - 404',async ()=>{

    const {
      getForecastByCity
    } = proxyquire('../../src/lib/weather.js',{
      'node-fetch':sinon.fake.resolves({status:404,body:'Internal server error'})
    });

    await chai.expect(getForecastByCity('Buenos Aires')).to.be.rejectedWith('Request not succes');

  });

  it('getForecastByCity - 200',async ()=>{

    const mock = {
      status:200,
      json:sinon.fake.returns({
        weather:[{
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n' 
        }]
      })
    };

    const {
      getForecastByCity
    } = proxyquire('../../src/lib/weather.js',{
      'node-fetch':sinon.fake.resolves(mock)
    });

    const result = await getForecastByCity('Buenos Aires');
   
    chai.expect(result).to.eql({
      weather:[{
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03n' 
      }]
    });

  });

});