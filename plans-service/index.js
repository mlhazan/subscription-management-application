const express = require("express");
const Middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");
const AuthenticationMiddleware = require("./middleware/auth");

const PORT = process.env.PORT;

const app = express();

const PlansController = require("./controllers/plans-controller");

Middleware(app);
AuthenticationMiddleware(app);

app.use("", PlansController);


//Error middleware must be defined after all middleware/routes
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
    console.log(`Plan Service listening on Port ${PORT}`);
})