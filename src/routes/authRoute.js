const express = require('express');
const auth = require("../controller/authController");
const Router = express.Router();



Router.route('/login').post(auth.authLogin);
Router.route('/getAttendance').get(auth.getAttendance);
Router.route('/logout/:userId').post(auth.logoutUser);

Router.route('/createAuth').post(auth.authCreation);


module.exports = Router;
