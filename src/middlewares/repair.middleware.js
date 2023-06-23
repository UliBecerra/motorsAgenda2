
const Repair = require('../models/repair.model')
const AppError = require('../utils/appError')

const catchAsync = fn =>{
  return (req, res, next) =>{
    fn(req, res, next).catch(next)
  }
}

exports.validRepair = catchAsync ( async (req, res, next) =>{
  const {id} = req.params

  const repair = await Repair({
    wherw:{
      id,
      status: 'pending'
    }
  })

  if (!repair) {
      return next( new AppError('Service not found 🔍'), 404)
  }

  req.sessionUser = user
  next()
})

exports.rolProtect = (...rol) =>{
  return (req, res, next) =>{
    
    if (!rol.includes(req.sessionUser.role)){
      return next(new AppError('You dont have autorization', 403)) 
    }
    next()
  }
}