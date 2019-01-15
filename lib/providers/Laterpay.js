const Provider = require('../Provider');

class Laterpay extends Provider {
  constructor() {
    super('Laterpay', ['src=.+laterpay\\.net']);
  }
}

module.exports = Laterpay;
