const cache = require('./cache');
const detect = require('./detect');

/**
 * @class PayOwl
 *
 * @param {Object} [options]
 * @param {Object} [options.cacheProvider] Cache implementation.
 * @param {Function} [options.cacheProvider.init] Optional function to initialize cache.
 * @param {Function} options.cacheProvider.get Function to retrieve data from cache.
 * @param {Function} options.cacheProvider.set Function to store data on cache.
 * @param {String[]} [options.excludes = []] Providers to exclude.
 * Valid provider names:
 * > Laterpay
 * > LeakyPaywall
 * > MediaPass
 * > MemberGate
 * > MPPGlobalSolutions
 * > Pelcro
 * > PianoMedia
 * > Pigeon
 * > Recurly
 * > RevenueWire
 * > SubscriptionGenius
 * > Vindicia
 * @param {Number} [options.requestTimeout = 10000] Request timeout.
 */
class PayOwl {
  constructor({
    cacheProvider = cache,
    excludes = [],
    requestTimeout = 10000,
  } = {}) {
    this._cache = cacheProvider;
    this._excludes = excludes;
    this._requestTimeout = requestTimeout;
  }

  static async createInstance(options) {
    const instance = new PayOwl(options);
    await instance.init();

    return instance;
  }

  async init() {
    if (this._cache.init) await this._cache.init();
  }

  detect(url) {
    return detect(url, {
      cache: this._cache,
      excludes: this._excludes,
      requestTimeout: this._requestTimeout,
    });
  }
}

module.exports = PayOwl;
