const User = require("../models/user.model");
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt')
const AppError = require("../utils/appError")
exports.findUsers = async (req, res, next) => {

  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.json({
    
    results: users.length,
    status: "succes",
    message: "users found",
    users,
  });
};

exports.createUser = catchAsync ( async (req, res, next) => {

  const { name, email, password, role  } = req.body;

  const salt = await bcrypt.genSalt(12)
  const encryptedPassword = await bcrypt.hash(password, salt)



const user = await User.create({
    name: name.toLowerCase(),
    email,
    password: encryptedPassword,
    role
  })

  const token = await generateJWT(user.id)

  return res.status(200).json({
    message: "The user created",
    token,
    user:{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
 
})
exports.login = catchAsync ( async (req, res, next) =>{
  const {email, password} = req.params

  const userLogin = User.findOne({
    where:{
      email: email.toLowerCase(),
      status: 'available'
    }
  })
  if (!userLogin) {
    return next(new AppError(`User with email ${email} not found `, 404))
  }
  if (!(await bcrypt.compare(password, userFind.password))) {
    return next(new AppError(`incorrect email or password`, '401'))
   }

   const token = await generateFWT(userFind.id)

   res.status(200).json({
    status: 'succes',
    message:' Password changed',
    token,
    user:{
      id: userLogin.id,
      name: userLogin.id,
      email: userLogin.email,
      role: userLogin.role
    }
   })
})
exports.findUser = catchAsync( async (req, res, next) =>{
  const {id} = req.params

const user = await User.findOne({
  where:{
    id,
    status: 'available'
  }
})
if(!user){
  return res.status(404).json({
    status:"error",
    message: `The user with id ${id} not found`
  })
}
return res.json({
  status: "succes",
  message: "the user find",
  id,   
  user:{
    name: user.name,
    email: user.email,
    role: user.role
  }
})

})

exports.updateUser = catchAsync(async (req, res, next) => {

  const { id } = req.params;
  const { name, email } = req.body;

  const userUpdate = await User.findOne({
    where: {
      id,
    status: 'available',
    },
  });

  if (!userUpdate) {
    return res.status(404).json({
      status: "error",
      message: `User with id ${id} not found`,
    });
  }
  await userUpdate.update({ name, email });

  res.status(200).json({
    status: "succes",
    message: "User has been updadte",
    id,
  });

})

exports.deleteUser = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;

  const userDelete = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!userDelete) {
    return res.status(400).json({
      status: "error",
      message: `the user with ${id} not found `,
    });
  }

  await userDelete.update({ status: 'unavailable' });

  res.status(200).json({
    status: "succes",
    message: "The user has been delete",
    id,
  });

})
