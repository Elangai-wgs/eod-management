const mongoose = require('mongoose');
const schemaFields = require("../utils/schemaFieldUtils");
const { schema } = require('./authModel');
const { v4} = require('uuid')


const RoleSchema = mongoose.Schema({
   _id:{
    type:String,
    default:v4
   },
   roleName:{
    type:String,
    required:true
   },
   batch:{
    type:Array,
    default:[]
   },
   staffs:{
    type:Array,
    default:[]
   },
   trainee:{
    type:Array,
    default:[]
   },
   task:{
    type:Array,
    default:[]
   },
   eod:{
    type:Array,
    default:[]
   },
   assessment:{
    type:Array,
    default:[]
   },
   report:{
    type:Array,
    default:[]
   },
   schedule:{
    type:Array,
    default:[]
   },
   payroll:{
    type:Array,
    default:[]
   },
   isArchive:{
    type:Boolean,
    default:false
   },
   active:{
    type:Boolean,
    default:true
   },
   hierarchyLevel:{
    type:Number,
    required:true
   },
   syllabus:{
    type:Array,
    default:[]
   },
   system:{
    type:Array,
    default:[]
   },
   leave:{
    type:Array,
    default:[],
   }, 
   role:{
    type:Array,
    default:[]
   },
   authorityLevel:{
    type:String,
    enum:['High','Medium','Low']
   },
   attendance:{
      type:Array,
      default:[]
   },
   monthlyPayroll:{
      type:Array,
      default:[]
   },
   company:{
      type:Array,
      default:[]
   },
   designation:{
      type:Array,
      default:[]
   },
   dashboard: {
      type:Array,
      default:[]
   },
  },{timestamp:true,collection:"Role"});

  const RoleModel = mongoose.model('Role',RoleSchema);

  module.exports = { RoleModel }