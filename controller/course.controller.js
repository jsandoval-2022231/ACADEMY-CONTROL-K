const { response, json } = require('express');
const Course = require('../models/course');
const { getUserIdentity, getUserName } = require('../controller/auth.controller');

const getCourse = async (req, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    const [ total, courses ] = await Promise.all([
        Course.countDocuments(query),
        Course.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        courses
    });

}

const postCourse = async (req, res) => {
    let teacherId = getUserIdentity();
    req.body.teacher = teacherId;
    const { name, description, teacher} = req.body;

    const course = new Course({ name, description, teacher});

    await course.save();
    res.status(200).json({
        course
    });
}

module.exports = {
    getCourse, 
    postCourse
}