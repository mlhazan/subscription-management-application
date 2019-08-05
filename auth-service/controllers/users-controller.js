const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;
const UsersService = require("../services/users-service");
const validator = require("../middleware/validator")
const AuthenticationError = require("../../errors/authentication-error");

const usersService = new UsersService();


router.post("/sign-up", [validator('User')], asyncWrapper(async (req, res) => {

    let token = await usersService.create(req.body);
    res.send(token);
}));


router.post("/sign-in", [validator('User', 'login')], asyncWrapper(async (req, res) => {
    let {email, password} = req.body;

    let token = await usersService.signin(email, password);
    if (!token) {
        throw new AuthenticationError("Invalid Credential")
    } else {
        res.send(token);
    }

}));

module.exports = router;