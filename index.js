const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const dbHepler = require('./core/helpers/db.helper');
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: '*',
}

async function start() {
    await dbHepler.connect();

    app.use(fileUpload());
    app.use(cors(corsOptions));
    app.use(controllers);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(morgan('dev'));
    app.listen(port)
}

start();