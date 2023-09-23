const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();

const findUser = (username) => User.findOne(username);

module.exports = { create, findAllUserService, findUser};