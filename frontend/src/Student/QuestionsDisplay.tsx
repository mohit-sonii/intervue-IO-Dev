/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Timer from "@/assets/Timer.png";
import chat from "@/assets/chat.jpg";
import { socket } from "../socket.ts";
import type { getQuestionType } from "../types";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store.ts";

const QuestionsDisplay = () => {
   const [shouldLoad, setShouldLoad] = useState(true);
   const [question, setQuestion] = useState<getQuestionType>();
   const [selectedOption, setSelectOption] = useState<number | null>(null);
   const [timerCounter, setTimerCounter] = useState<number>(0);
   const [stopTimer, setStopTimer] = useState<boolean>(false);
   const [canViewResult, setCanViewResult] = useState<boolean>(false);
   const [questionId, setQuestionId] = useState<string>("");
   const [activeUsers, setActiveUser] = useState([]);
   const [showParticipants, setShowParticipants] = useState(true);
   const [openChat, setOpenChat] = useState<boolean>(false);

   const currentUser = useSelector((state: RootState) => state.currentUser);

   useEffect(() => {
      socket.on("recieve-question", ({ data, question_id }) => {
         setQuestionId(question_id);
         setQuestion(data);
         setTimerCounter(data.timeAllowed);
         setShouldLoad(false);
      });
      socket.on("users-list", (names) => {
         setActiveUser(names);
      });
      return () => {
         // socket.off("recieve-question");
         socket.off("connected-users");
         socket.off("users-list");
      };
   }, []);

   useEffect(() => {
      if (!canViewResult) return;

      socket.on("recieve-submission", (updatedQuestion) => {
         setQuestion(updatedQuestion);
      });

      return () => {
         socket.off("recieve-submission");
      };
   }, [canViewResult]);

   useEffect(() => {
      if (stopTimer || timerCounter <= 0) {
         setTimerCounter(60);
         return;
      }
      const timer = setTimeout(() => {
         setTimerCounter((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
   }, [timerCounter]);

   const selectOption = (index: number) => {
      setSelectOption(index);
   };

   const dispayResults = async () => {
      const data = {
         id: questionId,
         voteOptionIndex: selectedOption,
      };
      const result = await axios.post(
         "https://intervue-io-dev.vercel.app/student/questions",
         // "http://localhost:3000/student/questions",
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      setCanViewResult(true);
      setQuestion(result.data.updatedData);
      setStopTimer(true);
      toast.success("Please wait for the next question");
      socket.emit("join-result-room", questionId);

      // return ()=> {
      //    socket.emit('leave-room',questionId)
      // }
   };

   const showChat = () => {
      setOpenChat(!openChat);
   };
   const changeSelection = () => {
      setShowParticipants(!showParticipants);
   };

   return (
      <div className="flex flex-col gap-5 h-screen relative">
         <div className="flex w-full h-[100%]  m-auto justify-center flex-col  gap-5 items-center">
            <div>{shouldLoad && <Loading />}</div>
            {question && (
               <div className="w-[40%] flex h-max gap-6 justify-center items-center ">
                  <div className="w-full flex justify-between items-center">
                     <p className="text-[22px] font-semibold ">Question</p>
                     <div className="text-[12px] font-semibold flex flex-row itmes-center justify-center gap-3 w-max">
                        <img src={Timer} alt="Timer" width={20} height={20} />
                        <p
                           className={`${
                              timerCounter < 15 ? "text-red-500 " : "text-black"
                           }`}
                        >
                           00:{timerCounter}
                        </p>
                     </div>
                  </div>
                  <div className="w-full  justify-center  flex h-max bg-white  text-[17px] rounded-md border-[1px] border-[#8F64E1] ">
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
                                         (item.votes / question.totalVotes) *
                                            100
                                      )
                                    : 0;

                              const isSelected = selectedOption === index + 1;

                              return (
                                 <div
                                    key={index}
                                    onClick={() =>
                                       !canViewResult && selectOption(index + 1)
                                    }
                                    className={`relative group h-max w-full cursor-pointer rounded-md border-[1px] overflow-hidden 
            ${
               canViewResult
                  ? "border-[#8f64e1] bg-[#f9f9f9]"
                  : isSelected
                  ? "border-[#8f64e1] bg-[#f1f1f1]"
                  : "border-[#a3a1a1] bg-[#f3f0f0]"
            }`}
                                    style={{
                                       marginBottom: "10px",
                                       padding: "10px 15px",
                                    }}
                                 >
                                    {canViewResult && (
                                       <div
                                          className="absolute top-0 left-0 h-full bg-[#b89cec] transition-all duration-500 ease-in-out"
                                          style={{
                                             width: `${votePercent}%`,
                                             zIndex: 0,
                                          }}
                                       />
                                    )}

                                    <div className="flex items-center justify-between z-10 relative">
                                       <div className="flex items-center gap-4 text-sm">
                                          <p
                                             className={`w-[25px] h-[25px] flex items-center justify-center rounded-full text-[10px] font-bold 
                     ${
                        isSelected
                           ? "text-white bg-[#8f64e1]"
                           : "text-[#a3a1a1] bg-[#dbd9d9]"
                     }`}
                                          >
                                             {index + 1}
                                          </p>
                                          <span
                                             className={`${
                                                isSelected && !canViewResult
                                                   ? "font-semibold text-black"
                                                   : ""
                                             }`}
                                          >
                                             {item.optionText}
                                          </span>
                                       </div>

                                       {canViewResult && (
                                          <div className="text-sm  text-black font-semibold">
                                             {votePercent}%
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
                  {!canViewResult && (
                     <button
                        className="flex  self-end rounded-3xl font-medium cursor-pointer  text-md transition-all duration-300 ease-in-out text-white bg-[#8F64E1] border border-transparent hover:bg-white hover:text-[#8F64E1] hover:border-[#8F64E1] "
                        style={{ padding: "10px 60px" }}
                        onClick={dispayResults}
                     >
                        Submit
                     </button>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col justify-end items-end fixed bottom-2 right-2 gap-5">
            {openChat && (
               <div className="w-[300px] h-[350px]  border-b-gray-400 rounded-md shadow-blue-200 shadow-xl ">
                  <div className="w-full p-2 h-[30px] justify-between flex flex-row">
                     <div
                        className={`w-[20%] h-full flex justify-center  rounded-md items-center  ${
                           showParticipants
                              ? ""
                              : "border-b-1 font-bold border-[#8F64E1]"
                        }`}
                        onClick={changeSelection}
                     >
                        {" "}
                        <p className="text-medium text-[10px]">Chats</p>
                     </div>
                     <div
                        className={`w-[70%] h-full flex justify-start  rounded-md items-center ${
                           showParticipants
                              ? "border-b-1 font-bold border-[#8f64e1]"
                              : ""
                        }`}
                        onClick={changeSelection}
                     >
                        <p className="text-medium text-[10px]">Participants</p>
                     </div>
                  </div>
                  {showParticipants && (
                     <div
                        className="w-full flex flex-row "
                        style={{ margin: "2px",padding:'4px' }}
                     >
                        {activeUsers.map(
                           (item) =>
                              item != currentUser && (
                                 <p
                                    className="text-[12px] font-semibold w-full "
                                    style={{
                                       padding: "2px",
                                       marginBottom: "10.5px",
                                    }}
                                 >
                                    {item}
                                 </p>
                              )
                        )}
                     </div>
                  )}
               </div>
            )}

            <button
               className="rounded-full w-[50px]  flex justify-center items-center h-[50px] cursor-pointer"
               onClick={showChat}
            >
               <img src={chat} alt="Chat Icon" />
            </button>
         </div>
      </div>
   );
};

export default QuestionsDisplay;
