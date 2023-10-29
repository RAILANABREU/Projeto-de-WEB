const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();

const findUserService = async (body) => User.findOne({ username: body.username });



module.exports = { create, findAllUserService, findUserService};