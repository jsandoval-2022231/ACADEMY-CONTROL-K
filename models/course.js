const { Schema, model } = require('mongoose');  

const CourseSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Teacher is required']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Course', CourseSchema);