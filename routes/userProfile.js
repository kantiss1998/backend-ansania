const express = require("express");
const UserProfilController = require("../controllers/userProfile");

const userProfil = express.Router();

userProfil.get("/", UserProfilController.getUserProfiles);
userProfil.post("/", UserProfilController.createUserProfile);
userProfil.get("/:id", UserProfilController.getUserProfile);
userProfil.put("/:id", UserProfilController.updateUserProfile);
userProfil.put("/:id", UserProfilController.deleteUserProfile);

module.exports = userProfil;
