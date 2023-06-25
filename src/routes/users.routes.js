const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller.js");
const validationMiddleware = require('../middlewares/validations.middleware');

router
  .route("/")
  .get(usersController.findUsers)
  .post(validationMiddleware.createUserValidator, usersController.createUser)
  .post(usersController.login);

router
  .route("/:id")
  .get(usersController.findUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

  module.exports = router