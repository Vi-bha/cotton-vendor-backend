//require('rootpath')();
require("dotenv").config();
const express = require('express');


const app=express();

const morgan = require("morgan");

const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error_handler');
app.use(express.json())
app.use(cors({
    origin: `${process.env.BASE_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// api routes
app.use('/users', require('./users/user.controller'));
app.get("/", (req,res) =>res.send({success:true,message:"server isrunning"}))
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(process.env.PORT, () => console.log('Server listening on port ' + port));
