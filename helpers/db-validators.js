const User = require('../models/user');
const Role = require('../models/role');
const { getUserIdentity, getUserName } = require('../controller/auth.controller');

const emailExists = async (email = '') => {
    const exists = await User.findOne({ email });
    console.log('exists', exists);
    if (exists) {
        throw new Error(`The email ${email} already exists`);
    }
}

const userExistsById = async (id = '') => {
    const exists = await User.findOne({ id });
    if (exists) {
        throw new Error(`The id ${id} does not exists`);
    }
}

const isValidRole = async (role = '') => {
    const exists = await Role.findOne({ role });
    console.log('exists', exists);
    if (!exists) {
        throw new Error(`The role ${role} is not valid`);
    }
    if (exists.role === 'SUPER_ROLE') {
        throw new Error(`The role ${role} is not allowed to be created`);
    }
}

const isOwner = async (id = '') => {
    console.log('userIdentity', getUserIdentity(), 'id', id);
    if (id != getUserIdentity()) {
        throw new Error(`The user ${getUserName()} is not allowed to modify this user`);
    }
}

module.exports = {
    emailExists,
    userExistsById,
    isValidRole,
    isOwner
}