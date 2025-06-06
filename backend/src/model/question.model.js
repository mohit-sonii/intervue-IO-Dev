import mongoose, { Schema } from "mongoose";

// each question wll have the option and each option will have their text as well as the number of votes it recieved and their is  totalVotes who is used to count the number of votes in total
const QuestionSchema = new Schema({
   timeAllowed: Number,
   questionName: String,
   options: {
      type: [
         {
            optionText: String,
            optionIndex: Number,
            votes: Number,
         },
      ],
      default: [],
   },
   totalVotes: {
      type: Number,
      default: 0,
   },
});

export const Question = mongoose.model("Question", QuestionSchema);
