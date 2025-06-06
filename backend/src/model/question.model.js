
import mongoose,{ Schema } from "mongoose";

const QuestionSchema = new Schema({
    timeAllowed:Number,
    questionName:String,
    options:[String],
    votes:[
        {
            username:String,
            selectedOption:Number
        }
    ]
})

export const Question = mongoose.model('Question',QuestionSchema)