const Login = require("../models/User");

const findUserService = (username) => Login.findOne({username}).select("+senha");

module.exports = { findUserService };