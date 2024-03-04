const { response, json } = require('express');
const Student = require('../models/student');

const { getUserIdentity, getUserName } = require('../controller/auth.controller');

const getStudent = async (req, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    const [total, students] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        students
    });
}

const postCourse = async (req, res) => {
    let studentId = getUserIdentity();
    req.body.user = studentId;

    const { user, courses } = req.body;

    const studentExist = await Student.findOne({ user });
    if (!studentExist) {
        const student = new Student({ user, courses });
        await student.save();
        res.status(200).json({
            student
        });
    } else {
        const coursesToAdd = Array.isArray(courses) ? courses : [courses];
        const coursesAlreadyAdded = coursesToAdd.filter(course => studentExist.courses.includes(course));

        if (coursesAlreadyAdded.length > 0) {
            res.status(400).json({
                msg: `The course with id ${coursesAlreadyAdded.join(', ')} is already added to the student ${getUserName()}`
            });
        } else if (studentExist.courses.length <= 2) {
            studentExist.courses.push(...courses);
            await studentExist.save();
            res.status(200).json({
                msg: 'Course added to the student',
                studentExist
            });
        }else {
            res.status(400).json({
                msg: 'You just can add 3 courses'
            });
        }
    }

    // studentExist.courses.push(...courses);
    // await studentExist.save();
    // res.status(200).json({
    //     msg: 'Course added to the student',
    //     studentExist
    // });
    // const student = new Student({ user, courses });
    // student.courses.push(...courses);
    // await student.save();
    // res.status(200).json({
    //     student
    // });
}

const getCoursesByStudent = async (req, res) => {
    let studentId = getUserIdentity();
    req.body.user = studentId;

    const { user } = req.body;

    const student = await Student.findOne({ user }).populate('courses');
    res.status(200).json({
        msg: 'Courses of the student',
        student
    });
}



module.exports = {
    getStudent,
    postCourse,
    getCoursesByStudent
}
