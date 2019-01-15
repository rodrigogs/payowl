const keys = [];
const data = [];

const cache = {
  get(host) {
    return data[keys.indexOf(host)];
  },

  set(detected) {
    const { host } = detected;

    let index = keys.indexOf(host);
    if (index === -1) {
      keys.push(host);
      index = keys.length;
    }

    data[index] = detected;
  },
};

module.exports = cache;
