'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const rewire = require('rewire');
const fooJS = rewire('../app/foo');

const sandbox = sinon.createSandbox();

describe('customizations/foo', () => {
  let stubbedMethod;
  before('stub out callBar() method', () => {
    stubbedMethod = sandbox.stub(fooJS.__get__('barJS'), 'callBar');
    stubbedMethod.returns('Stubbed data');
  });

  after('Restore sandbox', () => {
    sandbox.restore();
  });
  describe('asyncFoo', () => {

    it('Should not die', () => {
      const nodePromise = fooJS.asyncFoo({});
      return nodePromise.then((rVal) => {
        expect(rVal).to.equal('Stubbed data');
        expect(stubbedMethod.calledOnce).to.be.true;
      });
    });


  });
});
