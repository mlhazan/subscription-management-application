const ValidationError = require("./validation-error");//500
const AuthenticationError = require("./authentication-error");//401
const AccessDeniedError = require("./access-denied-error");//403

module.exports = {
    AccessDeniedError,
    AuthenticationError,
    ValidationError
}

