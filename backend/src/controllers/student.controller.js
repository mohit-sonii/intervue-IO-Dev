import { Question } from "../model/question.model.js";


export const addVote = async (req, res) => {
   try {
      const { id, voteOptionIndex } = req.body;

      const question = await Question.findById(id);
      const option = question.options.find(
         (item) => item.optionIndex === voteOptionIndex
      );
      if (option) {
         option.votes += 1;
         question.totalVotes += 1;
         await question.save();
      }
      const io = req.app.get('io');
      if (io) {
         io.to(`result-room-${id}`).emit("recieve-submission", question);
      }
      res.status(200).json({
         status: 200,
         message: "Data Fetched Succcessfuly",
         updatedData: question,
      });
      return;
   } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "Internal Server Erorr" });
   }
};
