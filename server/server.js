require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const adminRoutes = require('./routes/adminRoutes')
const facultyRoutes = require('./routes/facultyRoutes')
const studentRoutes = require('./routes/studentRoutes')
const socketsetup = require('./middleware/socket')

const PORT = process.env.PORT || 4000;

//express app
const app = express()

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


let _response = {}

//routes
app.use('/api/admin', adminRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/student', studentRoutes)


//Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error);
})

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


// connect to db
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database')
        // listen to port
        const server = app.listen(PORT, () => {
            console.log('listening for requests on port', PORT)
        })
        socketsetup(server)
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/', (req, res) => {
    res.status(200).json(_response)
})