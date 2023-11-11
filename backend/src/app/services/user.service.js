const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();

const findUserService = async (body) => User.findOne({ username: body.username });

const findUser = async (username) => User.findOne({ username });

// Nesta busca por id eu gsoria de traser mais dois campo o token e data token

const findUserById = async (body) => User.findOne({ _id: body.id }, { resetPasswordToken: 1, resetPasswordExpires: 1 } );

const findUserServiceById = async (id) => User.findById(id);





module.exports = { create, findAllUserService, findUserService, findUserServiceById, findUserById, findUser };