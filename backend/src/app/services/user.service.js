const User = require("../models/User");

const create = (body) => User.create(body);

const findAllUserService = () => User.find();

const findUserservice = async (username) => User.findOne({ username });

// Nesta busca por id eu gostaria de trazer mais dois campo o token e data token

const findUserById = async (body) => User.findOne({ _id: body.id }, { resetPasswordToken: 1, resetPasswordExpires: 1 } );

const findUserServiceById = async (id) => User.findById(id);

const updateUserService = async (body) => User.findOneAndUpdate({ _id: body.id }, body, { new: true });





module.exports = { create, findAllUserService, findUserServiceById, findUserById, updateUserService, findUserservice };