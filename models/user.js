const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    state: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'STUDENT_ROLE',
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE']
    }
});   

// UserSchema.methods.toJSON = function() {
//     const { __v, password, _id, ...user } = this.toObject();
//     user.uid = _id;
//     return user;
// }

module.exports = model('User', UserSchema);