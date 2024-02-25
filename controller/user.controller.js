const { response, json } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUser = async (req, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    });
}

const postUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log("name", name, "email", email, "password", password);
    const user = new User({ name, email, password, role});

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.status(200).json({
        user
    });
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById({_id: id});

    res.status(200).json({
        user
    });
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { state: false });

    const user = await User.findOne({_id: id});
    const userAuth = req.user;

    res.status(200).json({
        msg: "User deleted",
        user,
        userAuth
    });
}

const putUser = async (req, res) => {
    const { id } = req.params;
    const { _id, email, state, role, ...rest } = req.body;
    await User.findByIdAndUpdate(id, rest);

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg: "User updated",
        user
    })
}

module.exports = {
    getUser,
    postUser,
    getUserById,
    deleteUser,
    putUser
}