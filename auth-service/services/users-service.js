const User = require("../models/index")["User"];
const jwt = require("jsonwebtoken");
const PasswordHasher = require("./password-hasher");

module.exports = class UsersService {
    constructor() {
        this.passwordHasher = new PasswordHasher();
    }

    async create(user){
        user.password = await this.passwordHasher.hash(user.password);
        user = await User.create(user);
        return this.generateAccessToken(user);
    }

    async findBYEmail(email){
        return await User.findOne({where: {email}});
    }
    async signin(email, password){
        let user = await this.findBYEmail(email);
        if(!user){
            return null;
        }
        if(await this.passwordHasher.check(password, user.password)===true){
            return this.generateAccessToken(user);

        }else
            return null;
    }

    generateAccessToken(user) {
        if (!user)
            throw new Error("Invalid User");

        let userInfo = user.toJSON();
        delete userInfo.password;
        let payload = {
            user: userInfo
        }
        const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            algorithm: "HS256",
            issuer: process.env.TOKEN_ISSUER,
            subject: `${user.id}`
        })
        return token;
    }
}