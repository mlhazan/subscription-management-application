const bcrypt = require("bcryptjs");// I was unable to install bcrypt 3.0.0

module.exports = class PasswordHasher {
    constructor() {
        this.rounds = 10;
    }

    async hash(password) {
        return await bcrypt.hash(password, this.rounds);
    }

    async check(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}