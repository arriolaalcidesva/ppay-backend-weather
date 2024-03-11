//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('current data - test', ()=>{

  it('getForecastByCity - city',async ()=>{

    const cityMock = 'Los Angeles';

    const locationMock = {
			ip: '50.1.2.3',
			city: 'Los Angeles',
			region: 'California',
			country: 'US',
			postal: 95693,
			latitude: 38.3926,
			longitude: -121.2429,
			timezone: 'America/Los_Angeles'
		};
		
		const weatherMock = {
			coord: { lon: -58.38, lat: -34.61 },
			weather:[{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			}]
		};

    const {
      fetchConditions
    } = proxyquire('../../src/services/current.js',{
      '../lib/ipdata.js':{
				getCity: sinon.fake.resolves(cityMock),
				getLocation: sinon.fake.resolves(locationMock)
			},
			'../lib/weather.js':{
				getWeatherByCity: sinon.fake.resolves(weatherMock)
			}
    });

		const result = await fetchConditions(true);

		chai.expect(result).to.eql({
			city:cityMock,
			weather: weatherMock
		});		

	});
	
  it('getForecastByCity - NO city',async ()=>{

    const cityMock = 'Los Angeles';

    const locationMock = {
			ip: '50.1.2.3',
			city: 'Los Angeles',
			region: 'California',
			country: 'US',
			postal: 95693,
			latitude: 38.3926,
			longitude: -121.2429,
			timezone: 'America/Los_Angeles'
		};
		
		const weatherMock = {
			coord: { lon: -58.38, lat: -34.61 },
			weather:[{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			}]
		};

    const {
      fetchConditions
    } = proxyquire('../../src/services/current.js',{
      '../lib/ipdata.js':{
				getCity: sinon.fake.resolves(cityMock),
				getLocation: sinon.fake.resolves(locationMock)
			},
			'../lib/weather.js':{
				getWeatherByCity: sinon.fake.resolves(weatherMock)
			}
    });

		const result = await fetchConditions(false);
		
		chai.expect(result).to.eql({
			city:locationMock,
			weather: weatherMock
		});

	});
	
  it('getForecastByCity - undefined',async ()=>{

    const cityMock = 'Los Angeles';

    const locationMock = {
			ip: '50.1.2.3',
			city: 'Los Angeles',
			region: 'California',
			country: 'US',
			postal: 95693,
			latitude: 38.3926,
			longitude: -121.2429,
			timezone: 'America/Los_Angeles'
		};
		
		const weatherMock = {
			coord: { lon: -58.38, lat: -34.61 },
			weather:[{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			}]
		};

    const {
      fetchConditions
    } = proxyquire('../../src/services/current.js',{
      '../lib/ipdata.js':{
				getCity: sinon.fake.resolves(cityMock),
				getLocation: sinon.fake.resolves(locationMock)
			},
			'../lib/weather.js':{
				getWeatherByCity: sinon.fake.resolves(weatherMock)
			}
    });

		const result = await fetchConditions();
		
		chai.expect(result).to.eql({
			city:locationMock,
			weather: weatherMock
		});

  });	

});