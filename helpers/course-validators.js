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

const limitCourses = async () => {
    const student = await Student.findOne({getUserIdentity});
    console.log("course: ", student);
    if (!student) {
        
    }else if(student.courses.length > 3){

    }
}

module.exports = {
    isTeacher,
    limitCourses
    //existCourse,
}