//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('location controller - test', ()=>{

  it('location controller', async ()=>{

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

    const location  = proxyquire('../../../src/server/controller/location.js',{
      'pino':()=>({
        info:sinon.fake.returns('')
      }),
      '../../services/location.js':{
        fetchLocation: sinon.fake.resolves(mock)
      }
    });

    const jsonStub = sinon.spy();

    const req = {
      headers:{
        'x-forwarded-for':'127.0.0.1'
      },      
      url:'mock.com',
      method:'GET'
    };

    const res = {
      status:sinon.fake.returns({
        json:jsonStub
      })
    };

    await location(req,res,null,false);
    chai.expect(jsonStub.firstCall.args[0]).to.eql(mock);

  });
  
  it('location controller - error', async ()=>{

    const location  = proxyquire('../../../src/server/controller/location.js',{
      '../../services/location.js':{
        fetchLocation:()=>{
          throw {error:'mocked.com'};
        }
      },
      'pino':()=>({
        info:sinon.fake.returns('')
      })
    });

    const nextStub = sinon.spy();

    const req = {
      headers:{
        'x-forwarded-for':'127.0.0.1'
      },      
      url:'mock.com',
      method:'GET'
    };

    const res = {
      status:sinon.fake.returns({
        json:sinon.fake.returns(true)
      })
    };

    await location(req,res,nextStub,false);
    chai.expect(nextStub.firstCall.args[0]).to.eql({ error: 'mocked.com' });

	});


});