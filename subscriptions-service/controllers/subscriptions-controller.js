const router = require("express").Router();
const asyncWrapper = require("../../utilities/async-wrapper").AsyncWrapper;
const SubscriptionService = require("../services/subscriptions-service");
const validator = require("../middleware/validator");
const protectedRoute = require("../middleware/protected-route");

const subscriptionsService = new SubscriptionService();

//using to the whole route
router.use(protectedRoute());

//GET api/plans
router.get("/", asyncWrapper(async (req, res) => {
    let userId = 1;
    let subscriptions = await subscriptionsService.findAll(userId);
    res.send(subscriptions);
}));

//GET api/plans/:id
router.get("/:id", asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let subscription = await subscriptionsService.findOne(id);
    res.send(subscription);
}));

//POST api/plans
router.post("/", [validator("Subscription")],asyncWrapper(async (req, res) => {
    let subscription = await subscriptionsService.create(req.body);
    res.send(subscription);
}));

//DELETE api/plans/:id
router.delete("/:id", asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await subscriptionsService.deleteOne(id);
    res.sendStatus(200);
}));

module.exports = router;