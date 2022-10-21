const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide name'],
        minlength:3,
        maxlength:20,
        unique:true,
    },
    email:{
        type:String,
        required:[true,'please provide email'],
        maxlength:50,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,'Please provide valid email'
        ],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minlength:6,
    },
    profilePicture:{
        type:String,
        default:""
    },
    publicId:{  // cloudinary image id
        type:String
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        maxlength:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        maxlength:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},{timestamps:true})

// mongoose middleware
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})
// Schema instance methods
UserSchema.methods.getName = function(){
    return this.username;
}
UserSchema.methods.getId = function(){
    return this._id;
}
UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id,username:this.username,isAdmin:this.isAdmin},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass,this.password);
    return isMatch;
}
module.exports = mongoose.model('User',UserSchema);
