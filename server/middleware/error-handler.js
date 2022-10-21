const { CustomAPIError } = require('../errors/index')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message||"Something went wrong try again later"
  }
  
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  // mongoose errors
  if(err.name === 'ValidatorError'){
    customError.type = "ValidatorError"
    customError.msg = Object.values(err.errors).map(item=>item.message).join(',')
    return res.status(customError.statusCode).json(customError);
  }
  if(err.name === 'CastError'){
    customError.type = "CastError"
    customError.msg = `No user/post found with id : ${err.value}`
    return res.status(customError.statusCode).json(customError);
  }

  // mongoDB error
  if(err.code === 11000)
    return res.status(400).json({"name":err.name,"msg":"user already exists"})
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({customError,err})
}

module.exports = errorHandlerMiddleware
