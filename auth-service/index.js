const express = require("express");
const Middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");

const PORT = process.env.PORT;

const app = express();

const UsersController = require("./controllers/users-controller");

Middleware(app);
app.use("", UsersController);


//Error middleware must be defined after all middleware/routes
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
    console.log(`Auth Service listening on Port ${PORT}`);
})