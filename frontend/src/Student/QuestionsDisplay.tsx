import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { broadCast } from "../broadCastQuestion";
import Timer from "@/assets/Timer.png";
import { addQuestion } from "../reducers/questionsReducer";
import axios from "axios";
import type { getQuestionType } from "../types";

const QuestionsDisplay = () => {
   const [shouldLoad, setShouldLoad] = useState(true);
   const [completedQuestions, setCompletedQuestions] = useState<number>(0);
   const [questions, setQuestions] = useState<getQuestionType[]>([]);
   const dispatch = useDispatch();
   const [selectedOption, setSelectOption] = useState<number | null>(null);
   const [timerCounter, setTimerCounter] = useState<number>(15);

   const [currentQuestion, setCurrentQuestion] = useState<{
      timeAllowed: number;
      id: number;
      options: string[];
      questionName: string;
   }>();

   useEffect(() => {
      questions.map((item, index) => {
         setTimeout(() => {
            const newObj = {
               timeAllowed: item.timeAllowed,
               id: index + 1,
               options: item.options,
               questionName: item.questionName,
            };
            setCurrentQuestion(newObj);
            setTimerCounter(newObj.timeAllowed);
         }, item.timeAllowed);
         setCompletedQuestions((prev) => prev + 1);
      });
   }, [questions]);

   useEffect(() => {
      if (timerCounter <= 0) {
         return;
      }
      const timer = setTimeout(() => {
         setTimerCounter((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
   }, [timerCounter]);

   useEffect(() => {
      broadCast.onmessage = (event) => {
         const recievedQuestion = event.data;
         dispatch(addQuestion(recievedQuestion));
         setQuestions([...questions, recievedQuestion]);
         setShouldLoad(false);
      };
   }, [dispatch, questions]);

   useEffect(() => {
      const loadQuestion = async () => {
         const response = await axios.get(
            "http://localhost:3000/teacher/get-questions"
         );
         if (response.data.status != 200) {
            console.log(response.data);
            return;
         } else {
            if (response.data.data.length != 0) {
               setQuestions(response.data.data);
               setShouldLoad(false);
            }
         }
      };
      loadQuestion();
   }, []);

   const selectOption = (index: number) => {
      setSelectOption(index);
   };

   const moveForward=()=>{
      // show poll result
   }

   return (
      <div className="flex w-full h-screen m-auto justify-center flex-col  gap-5 items-center">
         <div>{shouldLoad && <Loading />}</div>
         {currentQuestion && (
            <div className="w-[40%] flex h-max gap-6 justify-center items-center ">
               <div className="w-full flex justify-between items-center">
                  <p className="text-[22px] font-semibold ">
                     Question {currentQuestion.id}
                  </p>
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
                     {currentQuestion.questionName}
                  </div>
                  <div
                     className="w-[95%] items-center justify-center flex b-red-400"
                     style={{ padding: "10px" }}
                  >
                     <div className=" items-center justify-center w-full rounded-md">
                        {currentQuestion.options.map((item, index) => {
                           const isSelected = selectedOption === index;
                           return (
                              <div
                                 key={index}
                                 onClick={() => selectOption(index)}
                                 className={`flex items-center gap-4 h-max w-full text-sm cursor-pointer rounded-md border-[1px]  ${
                                    isSelected
                                       ? "bg-[#f1f1f1] border-[#8f64e1] text-black font-semibold"
                                       : "bg-[#f3f0f0] border-[#a3a1a1] text-gray-700"
                                 }`}
                                 style={{
                                    padding: "10px",
                                    marginBottom: "10px",
                                 }}
                              >
                                 <p
                                    className={`w-[25px] h-[25px] flex items-center justify-center rounded-full text-[10px] font-bold ${
                                       isSelected
                                          ? "text-white bg-[#8f64e1]"
                                          : "text-[#a3a1aK1] bg-[#dbd9d9]"
                                    }`}
                                 >
                                    {index + 1}
                                 </p>
                                 {item}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
               <button
                  className="flex  self-end rounded-3xl font-medium cursor-pointer  text-md transition-all duration-300 ease-in-out text-white bg-[#8F64E1] border border-transparent hover:bg-white hover:text-[#8F64E1] hover:border-[#8F64E1] "
                  style={{ padding: "10px 60px" }}
                  onClick={moveForward}
               >
                  Submit
               </button>
            </div>
         )}
      </div>
   );
};

export default QuestionsDisplay;
