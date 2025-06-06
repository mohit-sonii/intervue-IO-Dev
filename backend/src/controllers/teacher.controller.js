import { Question } from "../model/question.model.js";

export const addQuestion = async (req, res) => {
   try {
      const data = req.body;
      const question = await Question.create({
         timeAllowed: parseInt(data.timeAllowed, 10),
         questionName: data.questionName,
         options: data.options,
         votes: [],
      });
      // const io = req.app.get("io");

      // io.on("connection", (socket) => {
      //   console.log(socket,"this is coket")
      //    socket.on("recieve-question", (question) => {
      //       console.log(question,"tbs is questions")
      //       io.emit("recieve-question", question);
      //    });
      // });
      
      res.status(200).json({
         status: 200,
         message: "Question Added Successfully",
      });
      return;
   } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
      return;
   }
};

export const getQuestion = async (_, res) => {
   try {
      const response = await Question.find({});
      const filtered = response.map((item, key) => ({
         timeAllowed: item.timeAllowed,
         questionName: item.questionName,
         options: item.options,
      }));
      res.status(200).json({
         status: 200,
         message: "Data Fetched Successfully",
         data: filtered,
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
      return;
   }
};
