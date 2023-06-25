const express = require("express");
const router = express.Router();

const repairsController = require("../controllers/repairs.controller.js");
const repairMiddleware = require('../middlewares/repair.middleware.js')
const userMiddleware = require('../middlewares/user.middleware.js')
const validationMiddleware = require('../middlewares/validations.middleware');

 router.use(userMiddleware.protectToken) 
 router
  .route("/")
    .get( repairsController.repairsFind)
  .post(validationMiddleware.createReapairValidator, repairsController.repairCreate);

router
  .route("/:id")
  .get(repairMiddleware.rolProtect('employee'), repairsController.repairFind)
  .patch(repairMiddleware.rolProtect('employee'), repairsController.repairUpdate)
  .delete(repairMiddleware.rolProtect('employee'), repairsController.repairDelete);

module.exports = router
