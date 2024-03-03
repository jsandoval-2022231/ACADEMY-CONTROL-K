const User = require('../models/user');
const Course = require('../models/course');
const { getUserIdentity, getUserName } = require('../controller/auth.controller');
const Student = require('../models/student');


const isTeacher = async () => {
    const user = await User.findById(getUserIdentity());
    if (user.role !== 'TEACHER_ROLE') {
        throw new Error(`The user ${user.name} is not allowed to create a course`);
    }
}

const existStudent = async (id) => {
    const student = await Student.findOne({ id });
    if (student) {
        
    }
}

const existCourse = async (id = []) => {
    const course = await Student.findOne({ getUserIdentity });
    console.log(course);
    if (course.courses.includes()) {
        throw new Error(`The course with id ${id} is already added to the student ${getUserName()}`);
    }
}

const limitCourses = async (courses) => {
    if (courses.length > 3) {
        throw new Error('The limit of courses is 3');
    }
}

module.exports = {
    isTeacher,
    limitCourses,
    existCourse,
    existStudent
}