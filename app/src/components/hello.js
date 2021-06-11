const path = require('path');
const log = require('./log').child({ component: path.parse(module.filename).name });

const hello = {
  /**
   * @function getHello
   * Returns hello world
   * @returns {string} A string
   */
  getHello: () => {
    const value = 'Hello World!';
    log.info(value, { function: 'getHello' });
    return value;
  }
};

module.exports = hello;
