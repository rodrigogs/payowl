/**
 * @jest-environment node
 */

const Laterpay = require('./Laterpay');

describe('Laterpay', () => {
  it('Should verify http://bauhaus-movement.com/ as a valid site', async () => {
    const laterpay = new Laterpay();
    const result = await laterpay.detect('http://bauhaus-movement.com/');

    expect(result).toBe(true);
  });

  it('Should verify https://msn.com/ as an invalid site', async () => {
    const laterpay = new Laterpay();
    const result = await laterpay.detect('http://msn.com/');

    expect(result).toBe(false);
  });
});
