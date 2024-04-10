const { Schema, model } = require('mongoose')

const adminAttendance = new Schema({
    timeLimit: Number,
    status: String,
    createdAt: Date,
});

const AdminAttendance = model('AdminAttendance', adminAttendance);
model.exports = AdminAttendance;