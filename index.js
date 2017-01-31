'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const rabrpc = require('rabrpc')

module.exports = class RabrpcTrailpack extends Trailpack {

  validate () {
    if (!this.app.config.rabrpc) {
      return Promise.reject(new Error('rabrpc config is required'))
    }
    return Promise.all([
      lib.Validator.validateRabRPCConfig(this.app.config.rabrpc)
    ])
  }

  initialize () {
    return rabrpc.configure(this.app.config.rabrpc)
    .then(result => {
      this.initialized = true
      return result
    })
    .catch(error => {
      this.initialized = false
      if (typeof error === 'string') {
        throw new lib.Errors.RabRPCError(error)
      }
      else {
        throw error
      }
    })
  }

  unload () {
    return new Promise((resolve, reject) => this.initialized ? rabrpc.shutdown() : undefined)
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
    app.rabrpc = rabrpc
  }
}

