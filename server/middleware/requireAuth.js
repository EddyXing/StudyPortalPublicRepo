const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const admin = require('../models/admin')
const faculty = require('../models/faculty')
const student = require('../models/student')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    //'Bearer kgiuguogogo.huvuiviuviu.ihviuviuvuv'

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.SECRET)
        const _id = new mongoose.Types.ObjectId(id)
        req.admin = await admin.findOne({ _id })
        req.faculty = await faculty.findOne({ _id })
        req.student = await student.findOne({ _id })
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth