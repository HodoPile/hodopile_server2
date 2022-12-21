module.exports = (req, res, next ) => {
    res.locals.user = req.oidc.user;
    next();
}