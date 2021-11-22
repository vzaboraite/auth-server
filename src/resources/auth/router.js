const { Router } = require("express");
const { signup } = require("./controller");

const router = Router();

router.post("/signup", signup);

module.exports = router;
