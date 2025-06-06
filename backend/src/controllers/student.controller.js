import { Question } from "../model/question.model.js";

export const addVote=async(req,res)=>{
    try{
        // vote Option can be 1,2,3,4
        const {id,voteOptionIndex} = req.body;

        const question = await Question.findById(id);
        const option = question.options.find(item=>item.optionIndex===voteOptionIndex)
        if(option){
            option.votes+=1;
            question.totalVotes+=1
            await question.save();
        }

    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:"Internal Server Erorr"})
    }
}