const config = require('../config/base.json')
const lang = require('./en/base.json')

module.exports = lang[config.default_language];

