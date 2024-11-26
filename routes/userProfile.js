const express = require("express");
const UserProfilController = require("../controllers/userProfile");

const userProfil = express.Router();

userProfil.get("/", UserProfilController);
userProfil.get("/:email", UserProfilController);
userProfil.put("/", UserProfilController);
userProfil.delete("/", UserProfilController);

module.exports = userProfil;