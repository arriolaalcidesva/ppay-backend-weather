//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('forecast controller - test', ()=>{

  it('forecast controller', async ()=>{

    const forecast  = proxyquire('../../../src/server/controller/forecast.js',{
      '../../services/forecast.js':{
        fetchForecast:sinon.fake.resolves({weather:true})
      },
      'pino':()=>({
        info:sinon.fake.returns('')
      })
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

    await forecast(req,res,null,false);
    chai.expect(jsonStub.firstCall.args[0]).to.eql({ weather: true });

  });

  it('forecast controller - undefined', async ()=>{

    const forecast  = proxyquire('../../../src/server/controller/forecast.js',{
      '../../services/forecast.js':{
        fetchForecast:sinon.fake.resolves({weather:true})
      },
      'pino':()=>({
        info:sinon.fake.returns('')
      })
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

    await forecast(req,res,null);
    chai.expect(jsonStub.firstCall.args[0]).to.eql({ weather: true });

  });

  it('forecast controller - error', async ()=>{

    const forecast  = proxyquire('../../../src/server/controller/forecast.js',{
      '../../services/forecast.js':{
        fetchForecast:()=>{
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

    await forecast(req,res,nextStub,false);
    chai.expect(nextStub.firstCall.args[0]).to.eql({ error: 'mocked.com' });

	});

});