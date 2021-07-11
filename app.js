require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

//! API Security

app.use(helmet());

//* handle CORS error
app.use(cors());

//! MongoDB Connection Setup
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== 'production') {

    const mongoDB = mongoose.connection

    mongoDB.on("open", () => {
        console.log("MongoDB is connected");
    });

    mongoDB.on("error", (error) => {
        console.log(error);
    });

    //Logger
    app.use(morgan("tiny"));
    
}



//Set up body parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Load Router

const userRouter = require('./src/routers/user.router')
const ticketRouter = require('./src/routers/ticket.router')

app.use('/v1/user', userRouter);
app.use('/v1/ticket', ticketRouter)

//errorHandler
const errorHandler = require('./src/utils/errorHandler')
app.use("*", (req, res, next) => {
    const error = new Error("Resources Not Found!!!")
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    errorHandler(error, res)
})



app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
