module.exports.AsyncWrapper = function (fn) {
    return (req, res, next) => {
        return fn(req, res).catch(next);
    }
}