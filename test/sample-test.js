// test/sample-test.js
const chai = require('chai');
const expect = chai.expect;

describe('Sample Test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });

  it('should not fail', () => {
    expect(false).to.equal(false);
  });
});
