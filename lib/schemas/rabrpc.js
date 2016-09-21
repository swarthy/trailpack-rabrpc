const joi = require('joi')

const cfgObj = joi.object().keys({
  serviceName: joi.string().required()
}).unknown()

const cfg = joi.alternatives().try(
  joi.string(),
  joi.array().items(joi.string()),
  cfgObj,
  joi.array().items(cfgObj)
)

module.exports = joi.object().keys({
  connection: joi.alternatives().try(joi.string(), joi.object()).required(),
  req: cfg,
  res: cfg,
  send: cfg,
  recv: cfg
})
