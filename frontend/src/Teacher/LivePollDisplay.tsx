import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket.ts";
import type { getQuestionType } from "../types.ts";
import { DotLoader } from "react-spinners";

const LivePollDisplay = () => {
   const { id } = useParams();
   const [question, setQuestion] = useState<getQuestionType | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!id) return;

      socket.emit("join-result-room", id);

      socket.emit("fetch-question", id);

      socket.on("recieve-submission", (updatedQuestion) => {
         console.log("updated questions form live ",updatedQuestion)
         setQuestion(updatedQuestion);
         setLoading(false);
      });

      socket.on("send-question-data", (questionData) => {
         if (questionData) {
            setQuestion(questionData);
            setLoading(false);
         }
      });
      return () => {
         socket.emit("leave-room", id);
         socket.off("recieve-submission");
         socket.off("send-question-data");
      };
   }, [id]);

   if (loading || !question)
      return <DotLoader className="absolute" color="#8F64E1" size={80} />;

   return (
      <div className="w-full h-screen m-auto flex items-center justify-center flex-col gap-5">
         <p className="text-[22px] font-semibold ">Question</p>
         <div className="w-[90%] md:w-[40%]  justify-center  flex h-max bg-white  text-[17px] rounded-md border-[1px] border-[#8F64E1] ">
            <div
               style={{ padding: "15px", borderRadius: "5px 5px 0 0" }}
               className="font-normal flex items-center text-sm  h-max w-full bg-gradient-to-r from-[#343434] to-[#6E6E6E] text-white "
            >
               {question.questionName}
            </div>
            <div
               className="w-[95%] items-center justify-center flex b-red-400"
               style={{ padding: "10px" }}
            >
               <div className=" items-center justify-center w-full rounded-md">
                  {question.options.map((item, index) => {
                     const votePercent =
                        question.totalVotes > 0
                           ? Math.round(
                                (item.votes / question.totalVotes) * 100
                             )
                           : 0;

                     return (
                        <div
                           key={index}
                           className={`relative group h-max w-full cursor-pointer rounded-md border-[1px] overflow-hidden `}
                           style={{
                              marginBottom: "10px",
                              padding: "10px 15px",
                           }}
                        >
                           <div
                              className="absolute top-0 left-0 h-full bg-[#b89cec] transition-all duration-500 ease-in-out"
                              style={{
                                 width: `${votePercent}%`,
                                 zIndex: 0,
                              }}
                           />

                           <div className="flex items-center justify-between z-10 relative">
                              <div className="flex items-center gap-4 text-sm">
                                 <p
                                    className={`w-[25px] h-[25px] flex items-center justify-center rounded-full text-[10px] font-bold bg-white text-black`}
                                 >
                                    {index + 1}
                                 </p>
                                 <span>{item.optionText}</span>
                              </div>
                              <div className="text-sm  text-black font-semibold">
                                 {votePercent}%
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
               <div className="px-5 py-2 text-xs  font-bold text-right text-gray-500">
                  Total Votes: {question.totalVotes}
               </div>
            </div>
         </div>
      </div>
   );
};

export default LivePollDisplay;
