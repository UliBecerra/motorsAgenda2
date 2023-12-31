const Repair = require('../models/repair.model')
const catchAsync = require('../utils/catchAsync')
exports.repairsFind = catchAsync( async(req, res) =>{

    const repairs = await Repair.findAll({
      where:{
        status: "pending"
      }
      
    })
    res.json({
      
      results: repairs.length,
      status: "succes",
      message: "Repairs found",
      repairs,
    });
  }
)
exports.repairCreate = catchAsync(async(req, res) =>{
 
    const {date, userId, motorsNumber, description} = req.body
console.log(date, userId, motorsNumber, description)
  const repair = await Repair.create({
    date, userId, motorsNumber, description
  })
  return res.status(201).json({
    message: "product created",
    repair,
    motorsNumber,
    description
  })
 
})
exports.repairFind = catchAsync( async(req, res) =>{
  const {id} = req.params

  const repair = await Repair.findOne({
    where: {
      id,
      status:"pending"
    }
  }) 

  if (!repair){
    return res.status(404).json({
      status:"error",
      message:`The repair with id ${id} not found`
    })
  }

  return res.status(200).json({
    status:"sucess",
    message:"Repair found",
    id,
    repair
  })
})
exports.repairUpdate = catchAsync(async(req, res) =>{

    const {id} = req.params
    const repairUpdate = await Repair.findOne({
      where:{
        id,
        status: "pending"
      }
    })
    if(!repairUpdate){
        return res.status(404).json({
          status: "error",
          message:`The repair with id ${id} not found`
        })
    }
    await repairUpdate.update({status: "completed"})
    return res.status(200).json({
      status:"succes",
      message:"The repair completed "
    })

  
})
exports.repairDelete = async (req, res) =>{

      const {id} = req.params

    const repairDelete = await Repair.findOne({
      where:{
        id,
        status: "pending"
      }
    })

    if(!repairDelete){
      return res.status(404).json({
        status:"error",
        message:`The repair with id ${id} not found`
      })
    }

    await repairDelete.update({status: "cancelled"})
    res.status(200).json({
      status: "succes",
      message: "The user has been delete",
      id,
    });


}
