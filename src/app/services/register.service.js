const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();


module.exports = { create, findAllUserService};