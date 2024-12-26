const express = require("express");
const FinishingController = require("../controllers/finishing");

const finishing = express.Router();

finishing.get("/", FinishingController.getFinishings);
finishing.post("/", FinishingController.createFinishing);
finishing.get("/:id", FinishingController.getFinishing);
finishing.put("/:id", FinishingController.updateFinishing);
finishing.delete("/:id", FinishingController.deleteFinishing);

module.exports = finishing;
