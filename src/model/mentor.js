const mongoose = require('./index')

const mentorSchema = new mongoose.Schema({
    mentorname: { type: String, required: [true, "mentor name is required"] },
    email: { type: String, required: [true, "email is required"] },
    role: { type: String, required: [true, "role is required"] },
    batch: { type: Array, required: [true, "batch is required"] }
},
    {
        versionKey: false
    });


const mentorModel = mongoose.model('mentor', mentorSchema)

module.exports = mentorModel