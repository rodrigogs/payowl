# payowl
Detect websites protected by paywall applications.

## Install
```bash
npm install payowl
```

## Usage

### Basic
```javascript
const PayOwl = require('payowl');

const payowl = new PayOwl();
const provider = await payowl.detect('http://example.com');
console.log(provider); // Paywall provider name or null if no paywall was found
```

### Advanced
```javascript
const PayOwl = require('payowl');

const cacheProvider = {
  async init() {
    // IMPL
  },
  async get() {
    // IMPL
  },
  async set() {
    // IMPL
  },
};

const payowl = await PayOwl.createInstance(cacheProvider);
const provider = await payowl.detect('http://example.com');
console.log(provider); // Paywall provider name or null if no paywall was found
```
