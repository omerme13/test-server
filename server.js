const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./users.route');
const initUsers = require('./data/init');
const AppErr = require('./utils/appErr');

const app = express();

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to mongo Successfully!'))
    .then(initUsers());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

app.all("*", (req, res, next) => {
    next(new AppErr(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
    const status = err.isOperational && err.status ? err.status : 500;
    const message =
        err.isOperational && err.message ? err.message : "Server error";

    res.status(status).json({
        message,
    });
});

app.listen(4545, () => {
    console.log(`Sever Test::start running::4545`);
})

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection!");
    server.close(() => process.exit(1));
});