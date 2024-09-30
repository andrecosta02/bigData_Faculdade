const express = require("express")
const router = express.Router()

const PointController = require("./controllers/PointController")

router.get("/listAll/", PointController.listAll)
router.post("/register", PointController.register)

module.exports = router