const ProjectModel = require("../models/projectModel");
const ApiError = require("../utils/apiError");
const httpStatus = require('http-status');



exports.createProject = async(req)=>{
    const { projectName } = req.body;

    const project  = await ProjectModel.findOne({projectName})
    if (project) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "project already exist"});
    }

    const newProject = new ProjectModel({
        ...req.body
    })

    await newProject.save();
    return newProject
}

exports.getProjectAll = async(req)=>{
    const project = await ProjectModel.find({})
    if (!project) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "Batch not found"});
    }

    return project;
}

exports.getProjectId = async(req)=>{
    const { _id } = req.params
    console.log(req.params,"nnnn");
    
    
    if (!_id) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "Project id required"});
    }

    const project = await ProjectModel.findById(_id)
    return project;
}

exports.editProject = async(req)=>{
    const { _id } = req.params
    
    if (!_id) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "Project id required"});
    }

    const project = await ProjectModel.findById(_id)
    if (!project) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "project not found"});
    }

    const updateData = {...req.body}

    const updateTask = await ProjectModel.findByIdAndUpdate(_id,updateData,
        {new: true, runValidators: true}
    )

    return updateTask;
}

exports.deleteProject = async(req)=>{
    const { _id } = req.params
    
    if (_id) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "Batch id required"});
    }

    const project = await ProjectModel.findById(_id)
    if (!project) {
        throw new ApiError(httpStatus.BAD_REQUEST,{message: "Batch not found"});
    }

    const deleteProject = await ProjectModel.findByIdAndDelete(_id)
}