const { response, json } = require('express');
const Student = require('../models/student');

const { getUserIdentity, getUserName } = require('../controller/auth.controller');

const getStudent = async (req, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    const [ total, students ] = await Promise.all([
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

    const existStudent = await Student.findOne({ user: studentId } );
    if(existStudent){
        existStudent.courses.push(courses);
        response.status(200).json({
            existStudent
        });
    }else{
        const student = new Student({ user, courses});

        await student.save();
        res.status(200).json({
            student
        });
    }
    
}

module.exports = {
    getStudent,
    postCourse 
}
