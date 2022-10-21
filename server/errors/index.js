// by default index.js is imported(required) if we import the entire folder
// i.e require('../errors) 

const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const ForbiddenRequestError = require('./forbidden-request')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  ForbiddenRequestError
}
