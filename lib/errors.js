const ExtendableError = require('es6-error')

class RabRPCError extends ExtendableError {
  constructor (message) {
    super(message)
  }
}

module.exports = {
  RabRPCError
}
