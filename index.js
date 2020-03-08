const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const config = require('./config.json')
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: '*',
}

async function start() {
    try {
        await mongoose.connect(config.connectionUrl, (err, db) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log('Database is runnging!');
        })

        app.use(fileUpload());

        app.use(cors(corsOptions));
        app.use(controllers);
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(morgan('dev'));
        app.listen(port, () => {
            console.log(`Server is runnging on ${port} port.`)
        })
    } catch (err) {
        console.log(err);
    }
}

start();