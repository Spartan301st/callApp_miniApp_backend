const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsersData);
router.post("/addUser", userController.putUserData);
router.post("/deleteUser", userController.deleteUserData);
router.post("/updateUser", userController.updateUserData);

module.exports = router;
