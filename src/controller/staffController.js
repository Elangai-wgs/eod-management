const staffServices = require("../services/staffServices");
const catchAsync = require("../utils/catchAsync");



exports.createStaff = catchAsync (async(req,res)=>{
    const response = await staffServices.createStaff(req)
    res.status(200).json({status:true, message:'Staff created succesfully',data:response,})
})

exports.getStaffAll = catchAsync (async(req,res)=>{
    const response = await staffServices.getStaffAll(req)
    res.status(200).json({status:true, message:'Staffs get succesfully',data:response,})
})

exports.getStaffId = catchAsync (async(req,res)=>{
    const response = await staffServices.getStaffId(req)
    res.status(200).json({status:true, message:'Staff get succesfully',data:response,})
})

exports.editStaff = catchAsync (async(req,res)=>{
    const response = await staffServices.editStaff(req)
    res.status(200).json({status:true, message:'Staff updated succesfully',data:response,})
})

exports.deleteStaff = catchAsync (async(req,res)=>{
    const response = await staffServices.deleteStaff(req)
    res.status(200).json({status:true, message:'Staff deleted succesfully',data:response,})
})