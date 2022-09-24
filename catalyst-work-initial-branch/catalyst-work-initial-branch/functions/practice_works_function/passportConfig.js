const localStrategy = require("passport-local").Strategy;


function initializa(passport, gerUserEmail) {
    const getEmail = gerUserEmail;
    passport.use(new localStrategy({ usernameField: 'email'}))
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}

module.exports = initializa;