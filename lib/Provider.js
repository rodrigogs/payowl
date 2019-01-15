const axios = require('axios');
const conditionalRace = require('conditional-race');

class Provider {
  constructor(name, expressions = [], options = {}) {
    this._name = name;
    this._expressions = expressions;
    this._options = options;
  }

  get name() {
    return this._name;
  }

  static async _onError(err, type) {
    if (type) {
      return console.error(err);
    }
    throw err;
  }

  static async _getPageContent(url, { requestTimeout: timeout }) {
    try {
      return await axios.get(url, { timeout }).then(response => response.data);
    } catch (err) {
      await Provider._onError(err, 'loading-page');
      return null;
    }
  }

  static async _lookForRegex(content, regexp) {
    try {
      const regex = new RegExp(regexp);
      return regex.test(content);
    } catch (err) {
      await Provider._onError(err, 'building-regex');
      return false;
    }
  }

  static async _lookForResult(content, func) {
    try {
      return !!(await func(content));
    } catch (err) {
      await Provider._onError(err, 'executing-function');
      return false;
    }
  }

  async _lookForExpressions(content) {
    const verifications = [];

    this._expressions.forEach((exp) => {
      if (typeof exp === 'string') {
        verifications.push(Provider._lookForRegex(content, exp));
      }
      if (typeof exp === 'function') {
        verifications.push(Provider._lookForResult(content, exp));
      }
    });

    const passed = await conditionalRace(verifications, result => !result);
    return passed !== false;
  }

  async detect(url, { requestTimeout }) {
    const content = await Provider._getPageContent(url, { requestTimeout });
    if (!content) return false;
    return this._lookForExpressions(content);
  }
}

module.exports = Provider;
