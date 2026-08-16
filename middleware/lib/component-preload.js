module.exports = function ({ resources, options }) {
    return function (req, res, next) {
        if (req.path === "/Component-preload.js") {
            res.status(200).set("Content-Type", "application/javascript").end("");
        } else {
            next();
        }
    };
};