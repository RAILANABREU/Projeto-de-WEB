const Login = require("../app/models/User");

const findUserService = (username) => Login.findOne({username}).select("+senha");

module.exports = { findUserService };