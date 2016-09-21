const joi = require('joi')

const schemas = require('./schemas')

module.exports = {
  validateRabRPCConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.rabrpc, (err, value) => {
        if (err) return reject(new TypeError('config.rabrpc: ' + err))
        return resolve(value)
      })
    })
  }
}
