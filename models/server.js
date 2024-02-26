const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.studentPath = '/api/students';
        this.teacherPath = '/api/teachers';
        this.coursePath = '/api/courses';

        this.connectDB();
        this.middlewares();
        this.routes();

    }

    async connectDB(){
        await dbConnection();
    } 

    routes(){
        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.coursePath, require('../routes/course.routes'));
        //this.app.use(this.studentPath, require('../routes/student.routes'));
        //this.app.use(this.teacherPath, require('../routes/teacher.routes'));
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running and listening at the port', this.port);
        });
    }
}

module.exports = Server;