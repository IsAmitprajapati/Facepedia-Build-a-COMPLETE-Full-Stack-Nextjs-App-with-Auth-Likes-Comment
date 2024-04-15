import mongoose , { Schema } from 'mongoose'

const commentSchema = new mongoose.Schema({
    description : {
        type : String,
        default : ""
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    }
},{
    timestamps : true
})


const postSchema = new mongoose.Schema({
    description : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
    like : {
         type : Array,
         default : []
    },
    comment : [commentSchema]
},{
    timestamps : true
})


const postModel = mongoose.models.posts || mongoose.model("posts",postSchema)

export default postModel