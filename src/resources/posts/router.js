const { Router } = require("express");
const { getUserPosts } = require("./controller");

const router = Router();

router.get("/", getUserPosts);

module.exports = router;
