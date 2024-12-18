const taskServices = require("../services/taskServices");
const catchAsync = require("../utils/catchAsync");



exports.createTask = catchAsync(async(req,res)=>{
    const response = await taskServices.createTask(req);
    res.status(200).json({status:true, message:"Task created succesfully", data: response})
})

exports.getTaskAll = catchAsync(async(req,res)=>{
    const response = await taskServices.getTaskAll(req);
    res.status(200).json({status:true, message:"Task get succesfully", data: response})
})

exports.gatTaskId = catchAsync(async(req,res)=>{
    const response = await taskServices.getTaskId(req);
    res.status(200).json({status:true, message:"Task get succesfully", data: response})
})

exports.editTask = catchAsync(async(req,res)=>{
    const response = await taskServices.editTask(req);
    res.status(200).json({status:true, message:"Task updated succesfully", data: response})
})

exports.deleteTask = catchAsync(async(req,res)=>{
    const response = await taskServices.deleteTask(req);
    res.status(200).json({status:true, message:"Task deleted succesfully", data: response})
})