const User = require('../models/user');
const Course = require('../models/course');
const { getUserIdentity, getUserName } = require('../controller/auth.controller');


const isTeacher = async () => {
    const user = await User.findById(getUserIdentity());
    if (user.role !== 'TEACHER_ROLE') {
        throw new Error(`The user ${user.name} is not allowed to create a course`);
    }
}

const limitCourses = async (courses) => {
    if (courses.length > 3) {
        throw new Error('The limit of courses is 3');
    }
}

module.exports = {
    isTeacher,
    limitCourses
}