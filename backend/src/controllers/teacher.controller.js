import { Question } from "../model/question.model.js";

export const addQuestion = async (req, res) => {
   try {
      const data = req.body;

      const question = await Question.create({
         timeAllowed: parseInt(data.timeAllowed, 10),
         questionName: data.questionName,
         options: data.options,
      });
      res.status(200).json({
         status: 200,
         message: "Question Added Successfully",
         id: question._id.toString(),
      });
      const io = req.app.get('io')
      if (io) {
         io.to(`result-room-${question._id.toString()}`).emit(
            "recieve-submission",
            question
         );
      }
      return;
   } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
      return;
   }
};

export const getQuestion = async (id) => {
   try {
      const response = await Question.findById(id);
      return response
   } catch (err) {
      console.log(err);
      return null;
   }
};
