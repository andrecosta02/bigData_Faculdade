const express = require("express")
const router = express.Router()

const employeeController = require("./controllers/employeeController")

// router.get("/list", employeeController.listAll)
router.get("/list/:employeeId", employeeController.listOne)
router.post("/register", employeeController.register)
router.put("/update/:employeeId", employeeController.update)
router.delete("/delete/:employeeId", employeeController.delete)

module.exports = router