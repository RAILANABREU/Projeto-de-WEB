const Login = require("../models/Login");

const findUserService = () => Login.find();

module.exports = { findUserService };