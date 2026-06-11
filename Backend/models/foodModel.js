import mongoose from 'mongoose'

const {Schema} = mongoose

const foodSchema =new Schema({
    title:{
        type: String, 
        required:true
    }, 
    description:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
    }

},
{
    timestamps: true
}
)
export default mongoose.model ('Food', foodSchema)