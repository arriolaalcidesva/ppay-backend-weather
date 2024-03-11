//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('location - test', ()=>{

  it('fetchLocatioon - city',async ()=>{

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

    const {
      fetchLocation
    } = proxyquire('../../src/services/location.js',{
      '../lib/ipdata.js':{
				getLocation: sinon.fake.resolves(locationMock)
			}
    });

		const result = await fetchLocation(true);
		chai.expect(result).to.eql(locationMock);

  });
    
});