const { Schema, model } = require('mongoose');

const StudentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

module.exports = model('Student', StudentSchema);