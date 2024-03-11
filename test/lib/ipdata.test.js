//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('ip-api test', ()=>{

  it('getLocation - reject',async ()=>{

    const ipapiMock = {
      location:sinon.fake.yields(null, 'mocked error1')
    };

    const {
      getLocation
    } = proxyquire('../../src/lib/ipdata.js',{
      'ipapi.co':ipapiMock
    });

    await chai.expect(getLocation()).to.be.rejectedWith('mocked error');

  });

  it('getLocation - resolve',async ()=>{

    const mock = {
      ip: '50.1.2.3',
      city: 'Wilton',
      region: 'California',
      country: 'US',
      postal: 95693,
      latitude: 38.3926,
      longitude: -121.2429,
      timezone: 'America/Los_Angeles'
    };

    const ipapiMock = {
      location:sinon.fake.yields(mock,null)
    };

    const {
      getLocation
    } = proxyquire('../../src/lib/ipdata.js',{
      'ipapi.co':ipapiMock
    });

    const result = await getLocation();
    chai.expect(result).to.equal(mock);

  });  

  it('getCity - reject',async ()=>{

    const ipapiMock = {
      location:sinon.stub().yields(null, 'mocked error')
    };

    const {
      getCity
    } = proxyquire('../../src/lib/ipdata.js',{
      'ipapi.co':ipapiMock
    });

    await chai.expect(getCity()).to.be.rejectedWith('mocked error');

  });

  it('getCity - resolve',async ()=>{

    const ipapiMock = {
      location:sinon.stub().yields('Los Angeles',null,()=>{})
    };

    const {
      getCity
    } = proxyquire('../../src/lib/ipdata.js',{
      'ipapi.co':ipapiMock
    });

    const result = await getCity();    
    chai.expect(result).to.equal('Los Angeles');

  }); 

});