const express = require("express");
const UserController = require("../controllers/user");
const Authentication = require("../middlewares/authentication");

const user = express.Router();

user.get("/", UserController.GetUser);
user.get(
  "/:email",
  Authentication.isAuthenticated,
  UserController.GetUserByEmail
);
user.post("/register", UserController.CreateUser);
user.post("/login", UserController.Login);
user.put(
  "/updateuser",
  Authentication.isAuthenticated,
  UserController.UpdateUser
);
user.put(
  "/updatepassword",
  Authentication.isAuthenticated,
  UserController.UpdatePassword
);
user.post("/forgot-password", UserController.ForgotPassword);
user.post(
  "/reset-password",
  Authentication.validateResetToken,
  UserController.ResetPassword
);

module.exports = user;
