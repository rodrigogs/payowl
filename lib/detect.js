const { URL } = require('url');
const conditionalRace = require('conditional-race');

const allProviders = require('./providers');

/**
 * Detects if a website is protected by a paywall.
 *
 * @async
 *
 * @param {String} url Website url.
 * @param {Object} options Options object.
 * @param {Object} options.cache Cache implementation.
 * @param {Function} options.cache.get Function to retrieve data from cache.
 * @param {Function} options.cache.set Function to store data on cache.
 * @param {String[]} options.excludes Providers to exclude.
 * @param {Number} options.requestTimeout Request timeout.
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
 * @return {Promise<Object>} detected paywall
 */
const detect = async (url, { cache, excludes, requestTimeout }) => {
  const { host } = new URL(url);

  const providers = Object.keys(allProviders)
    .filter(provider => !excludes.includes(provider))
    .map(provider => new allProviders[provider]());

  const verifying = providers.map(async (provider) => {
    const cached = await cache.get(host);
    if (cached) return cached;

    const detected = await provider.detect(url, { requestTimeout });
    if (!detected) return null;

    await cache.set(host, provider.name);

    return provider.name;
  });

  const detected = await conditionalRace(verifying, result => !!result);
  if (!detected) return null;

  return detected;
};

module.exports = detect;
