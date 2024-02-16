const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        this.connectDB();
        this.routes();
        this.middlewares();
    }

    async connectDB(){
        await dbConnection();
    } 

    routes(){
        this.app.use(this.userPath, require('../routes/user.routes'));
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