const express = require('express');
const leaveController = require("../controller/leaveController");
const { verifyAuthToken } = require('../middlewares/jwt.config');


const Router = express.Router();
Router.use(verifyAuthToken);

Router.route('/applyLeave').post(verifyAuthToken,leaveController.applyLeaveRequset);
Router.route('/approveLeave/:_id').put(leaveController.approveLeave);
Router.get('/get-all',verifyAuthToken, leaveController.getAllLeaves);

module.exports = Router;