const mongoose = require('./index')


const studentSchema = new mongoose.Schema({
    studentname: { type: String, required: [true, 'student name is required'] },
    email: { type: String, required: [true, 'email is required'] },
    batch: { type: String},
    mentorname: { type: String },
    previousmentorname: { type: Array }
}, {
    versionKey: false
})

const studentModel = mongoose.model('studentData', studentSchema);

module.exports = studentModel