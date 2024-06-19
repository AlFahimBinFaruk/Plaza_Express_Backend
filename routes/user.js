const { loginUser, registerUser, getUserDetails } = require("../controllers/user");

const router = require("express").Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/details/:user_id", getUserDetails);


module.exports = router;