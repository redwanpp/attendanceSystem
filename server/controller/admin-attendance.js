const AdminAttendance = require('../models/AdminAttendance');

const getEnable = async (req, res, next) => {
    try {
        const attendance = new AdminAttendance({})
        await attendance.save();
        console.log('save successfull');

        return res.status(201).json({ message: 'Success', attendance});
    } catch (e) {
        next();        
    }
}

const getDisable = (req, res, next) => {

}

module.exports = {
    getEnable,
    getDisable
}