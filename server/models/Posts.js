const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    publicId:{  // cloudinary image id
        type:String,
    },
    userName:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        max:500
    },
    avatar:{
        type:String
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports = mongoose.model('Posts',PostSchema);