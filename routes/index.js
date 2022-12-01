const UserController = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/index");
const router = require("express").Router();

router.post("/login", UserController.login);

router.use(authentication);

router.post("/data", UserController.insertEpresence);
router.get("/data/:id_users", authorization, UserController.getData);

module.exports = router;
