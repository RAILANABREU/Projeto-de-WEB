const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();

const findUserService = async (username) => User.findOne({ username });

// Nesta busca por id eu gostaria de trazer mais dois campo o token e data token

const findUserByIdRZT = async (id) => User.findById(id, { resetPasswordToken: 1, resetPasswordExpires: 1 } );

const findUserByIdService = async (id) => User.findById(id);

const deleteUserService = async (id) => User.findByIdAndDelete(id);





module.exports = { create, findAllUserService, findUserByIdService, findUserByIdRZT, findUserService, deleteUserService };