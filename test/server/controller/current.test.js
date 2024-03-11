//Include unit testing libs.
const chai       = require('chai');
const proxyquire = require('proxyquire');
const sinon      = require('sinon');

//Add chai as promise.
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('current controller - test', ()=>{

  it('current controller', async ()=>{

    const current  = proxyquire('../../../src/server/controller/current.js',{
      '../../services/current.js':{
        fetchConditions:sinon.fake.resolves({weather:true})
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

    await current(req,res,null,false);
    chai.expect(jsonStub.firstCall.args[0]).to.eql({ weather: true });

  });
  
  it('current controller - undefined', async ()=>{

    const current  = proxyquire('../../../src/server/controller/current.js',{
      '../../services/current.js':{
        fetchConditions:sinon.fake.resolves({weather:true})
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

    await current(req,res,null);
    chai.expect(jsonStub.firstCall.args[0]).to.eql({ weather: true });

  });
  
  it('current controller - error', async ()=>{

    const current  = proxyquire('../../../src/server/controller/current.js',{
      '../../services/current.js':{
        fetchConditions:()=>{
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

    await current(req,res,nextStub,false);
    chai.expect(nextStub.firstCall.args[0]).to.eql({ error: 'mocked.com' });

	});

});