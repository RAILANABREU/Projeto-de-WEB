const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();

const findUserService = async (username) => User.findOne({ username });

// Nesta busca por id eu gostaria de trazer mais dois campo o token e data token

const findUserById = async (body) => User.findOne({ _id: body.id }, { resetPasswordToken: 1, resetPasswordExpires: 1 } );

const findUserServiceById = async (id) => User.findById(id);

const deleteUser = async (id) => User.findByIdAndDelete(id);





module.exports = { create, findAllUserService, findUserServiceById, findUserById, findUserService, deleteUser };