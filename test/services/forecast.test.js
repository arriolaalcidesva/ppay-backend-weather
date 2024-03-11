//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('forecast - test', ()=>{

  it('fetchForecast - city',async ()=>{

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
		
		const foreCastMock = {
			coord: { lon: -58.38, lat: -34.61 },
			weather:[{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			},{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			},{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			}]
		};

    const {
      fetchForecast
    } = proxyquire('../../src/services/forecast.js',{
      '../lib/ipdata.js':{
				getCity: sinon.fake.resolves(cityMock),
				getLocation: sinon.fake.resolves(locationMock)
			},
			'../lib/weather.js':{
				getForecastByCity: sinon.fake.resolves(foreCastMock)
			}
    });

		const result = await fetchForecast(true);

		chai.expect(result).to.eql({
			city:cityMock,
			forecast: foreCastMock
		});		

	});

  it('fetchForecast - NO city',async ()=>{

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
		
		const foreCastMock = {
			coord: { lon: -58.38, lat: -34.61 },
			weather:[{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			},{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			},{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			}]
		};

    const {
      fetchForecast
    } = proxyquire('../../src/services/forecast.js',{
      '../lib/ipdata.js':{
				getCity: sinon.fake.resolves(cityMock),
				getLocation: sinon.fake.resolves(locationMock)
			},
			'../lib/weather.js':{
				getForecastByCity: sinon.fake.resolves(foreCastMock)
			}
    });

		const result = await fetchForecast(false);
    
		chai.expect(result).to.eql({
			city:locationMock,
			forecast: foreCastMock
		});		

	});

  it('fetchForecast - undefined',async ()=>{

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
		
		const foreCastMock = {
			coord: { lon: -58.38, lat: -34.61 },
			weather:[{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			},{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			},{
				id: 802,
				main: 'Clouds',
				description: 'scattered clouds',
				icon: '03n' 
			}]
		};

    const {
      fetchForecast
    } = proxyquire('../../src/services/forecast.js',{
      '../lib/ipdata.js':{
				getCity: sinon.fake.resolves(cityMock),
				getLocation: sinon.fake.resolves(locationMock)
			},
			'../lib/weather.js':{
				getForecastByCity: sinon.fake.resolves(foreCastMock)
			}
    });

		const result = await fetchForecast();
    
		chai.expect(result).to.eql({
			city:locationMock,
			forecast: foreCastMock
		});		

	});

});