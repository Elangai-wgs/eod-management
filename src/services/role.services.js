const { default: status } = require("http-status");
const ApiError = require("../utils/apiError");
const { RoleModel } = require("../models/role.model");

exports.createRole = async(req)=>{
    const {name, hierarchyLevel, permissions} = req.body;

    if(!name){
        throw new ApiError(status.BAD_REQUEST,'Please provide a name for role');
    }
    if(!hierarchyLevel){
        throw new ApiError(status.BAD_REQUEST,'Please provide a hierarchy level for role');
    }
    if(!permissions){
        throw new ApiError(status.BAD_REQUEST,'Please provide permissions for role');
    }

    const createdRole = await RoleModel.create({name, hierarchyLevel, permissions});

    if(!createdRole){
        throw new ApiError(status.INTERNAL_SERVER_ERROR,'Failed to create role');
    }
    return createdRole;
}

exports.getAllRoles = async (req)=>{
    const roles = await RoleModel.find();

    if(roles.length<1){
        throw new ApiError(status.NOT_FOUND,'No roles found');
    }

    return roles;
}

exports.updateRole = async (req)=>{
    const {name} = req.body;
    const {role_id} = req.params;

    if(name){
       const role = await RoleModel.exist({name});
        if(role){
            throw new ApiError(status.BAD_REQUEST,`Role name ( ${name} ) already exist`);
        }
    }
    const updatedRole = await RoleModel.findByIdAndUpdate(role_id,{...req.body},true);

    if(!updatedRole){
        throw new ApiError(status.INTERNAL_SERVER_ERROR,'Failed to update role');
    }

    return updatedRole;
}

exports.deleteRole = async (req)=>{
    const {role_id} = req.params;

    const isExist = await RoleModel.exist({_id:role_id});

    if(!isExist){
        throw new ApiError(status.NOT_FOUND,'Role not found');
    }

    const deletedRole = await RoleModel.findByIdAndDelete(role_id);

    if(!deletedRole){
        throw new ApiError(status.INTERNAL_SERVER_ERROR,'Failed to delete role');
    }

    return deletedRole;
}