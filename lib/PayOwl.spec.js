/**
 * @jest-environment node
 */

const PayOwl = require('./PayOwl');

describe('PayOwl', () => {
  it('Should detect Laterpay provider on bauhaus-movement.com', async () => {
    const payowl = await PayOwl.createInstance();
    const detectedProvider = await payowl.detect('http://bauhaus-movement.com/');
    expect(detectedProvider).toBe('Laterpay');
  }, 10000);
});
