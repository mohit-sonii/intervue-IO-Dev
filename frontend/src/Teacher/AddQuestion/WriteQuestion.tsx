import { useEffect, useState, type ChangeEvent } from "react";
import { areAllFieldsValid } from "./handleSubmissionLogic";
import toast from "react-hot-toast";
import type { OptionsType } from "../../types";
import axios from "axios";
import eye from "@/assets/Eye.png";
import Timer from "@/assets/Timer.png";
import { socket } from "../../socket";
import { useNavigate } from "react-router";

const WriteQuestion = () => {
   const [timeAllowed, setTimeAllowed] = useState(60);
   const [buttonDisable, setButtonDisable] = useState(false);
   const [questionText, setQuestionText] = useState("");
   const [countCharacter, setCountCharacter] = useState(0);
   const [allOptions, setOptions] = useState<OptionsType[]>([]);
   const [questionId, setQuestionId] = useState<string>("");
   const navigate = useNavigate();

   const updateDuration = (e: ChangeEvent<HTMLSelectElement>) => {
      setTimeAllowed(Number(e.target.value));
   };
   const addCharacter = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setQuestionText(e.target.value);
   };

   const handleTextChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
      const updated = allOptions.map((item) =>
         item.optionIndex == id ? { ...item, optionName: e.target.value } : item
      );
      setOptions(updated);
   };
   const handleRadioChange = (id: number, option: string) => {
      const updated = allOptions.map((item) =>
         item.optionIndex == id ? { ...item, correctOption: option } : item
      );
      setOptions(updated);
   };
   const decreaseTimer = () => {
      setTimeout(() => {
         setTimeAllowed((prev) => prev - 1);
      }, 1000);
   };

   useEffect(() => {
      if (!buttonDisable || timeAllowed <= 0) {
         setButtonDisable(false);
         setQuestionId("");
         return;
      }
      decreaseTimer();
   }, [buttonDisable, timeAllowed]);

   const handleSubmission = async () => {
      if (buttonDisable) {
         toast.error("Please wait for the submission");
         return;
      }
      const result = areAllFieldsValid(questionText, allOptions);
      if (result.status == 200) {
         if (await storeinDB()) {
            toast.success(result.message);
            setOptions([]);
            setQuestionText("");
            setButtonDisable(true);
         }
      } else {
         toast.error(result.message);
      }
   };
   const storeinDB = async () => {
      const options = allOptions.map((item, index) => ({
         optionText: item.optionName,
         optionIndex: index + 1,
         votes: 0,
      }));
      try {
         const data = {
            timeAllowed,
            questionName: questionText,
            options,
         };
         const result = await axios.post(
            `https://intervue-io-dev-production.up.railway.app/teacher/add-questions`,
            // `http://localhost:3000/teacher/add-questions`,
            data,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         if (result.status != 200) {
            toast.error("Unexpected Error");
            return false;
         }
         setQuestionId(result.data.id);
         socket.emit("recieve-question", { data, question_id: result.data.id });
         return true;
      } catch (err) {
         console.log(err);
         return false;
      } finally {
         // socket.off("recieve-question");
      }
   };

   const addOption = () => {
      if (allOptions.length == 0) {
         const newObj = {
            optionIndex: 1,
            optionName: "",
            correctOption: "",
            votes: 0,
         };
         setOptions([newObj]);
      } else {
         const newObj = {
            optionIndex: allOptions.length + 1,
            optionName: "",
            correctOption: "",
            votes: 0,
         };
         setOptions([...allOptions, newObj]);
      }
   };

   const ViewLive = () => {
      if (questionId.length !== 0) navigate(`/teacher/live/${questionId}`)
         else toast.error('No Question has Made')
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         setCountCharacter(questionText.length);
      }, 500);
      return () => clearTimeout(timer);
   }, [questionText]);

   return (
      <div className="w-full flex gap-5 h-full" style={{padding:'20px'}}>
         <div className="flex justify-between w-[70%]  item-center">
            <p className="font-medium text-md flex items-center">
               Enter your question
            </p>
            <select
               style={{ padding: "10px 18px" }}
               className=" outline-0 bg-[#F1F1F1] rounded-md "
               name="timeAllowed"
               value={timeAllowed}
               onChange={(e) => updateDuration(e)}
            >
               <option value={60}>60 Seconds</option>
               <option value={30}>30 Seconds</option>
            </select>
         </div>
         <div className="w-[70%] h-[100px] bg-[#F1F1F1] rounded-md flex justify-center">
            <textarea
               style={{ padding: "10px" }}
               className="w-[95%] h-[65%] outline-0 resize-none"
               value={questionText}
               onChange={(e) => addCharacter(e)}
            />
            <p
               className={`w-[90%] h-[10%] text-right font-light text-sm ${
                  countCharacter <= 100 ? "text-black" : "text-red-500"
               }`}
            >
               {countCharacter}/100
            </p>
         </div>

         <div className="w-[60%] h-auto flex flex-col gap-3">
            <div className="w-full flex flex-row justify-between items-center gap-5">
               <div className="w-[30%]">
                  <p className="font-medium text-md flex items-center">
                     Edit Options
                  </p>
               </div>
               <div className="w-[25%]">
                  <p className="font-medium text-md flex items-center">
                     Is it Correct?
                  </p>
               </div>
               {allOptions.map((item, key) => {
                  return (
                     <div
                        className="flex flex-row w-full gap-4 items-center "
                        key={key}
                     >
                        <div className="w-[70%] flex flex-row  gap-4">
                           <p
                              className="w-[20px] h-[20px] flex items-center justify-center font-semibold text-[10px] rounded-full bg-[#8F64E1] text-white "
                              style={{ padding: "3px" }}
                           >
                              {item.optionIndex}
                           </p>
                           <input
                              type="text"
                              value={item.optionName}
                              maxLength={50}
                              onChange={(e) =>
                                 handleTextChange(e, item.optionIndex)
                              }
                              className="rounded-md text-sm outline-0 w-[80%] bg-[#F1F1F1] "
                              style={{ padding: "5px" }}
                           />
                        </div>
                        <div className="w-[25%] flex flex-row justify-between items-center">
                           <label className=" flex flex-row w-max ">
                              <input
                                 type="radio"
                                 value="yes"
                                 name={`option${item.optionIndex}`}
                                 onChange={() =>
                                    handleRadioChange(item.optionIndex, "yes")
                                 }
                              />
                              <p style={{ paddingLeft: "4px" }}>Yes</p>
                           </label>
                           <label className=" flex flex-row w-max ">
                              <input
                                 type="radio"
                                 value="no"
                                 name={`option${item.optionIndex}`}
                                 onChange={() =>
                                    handleRadioChange(item.optionIndex, "no")
                                 }
                              />
                              <p style={{ paddingLeft: "4px" }}>No</p>
                           </label>
                        </div>
                     </div>
                  );
               })}
            </div>

            <button
               className="w-[180px] rounded-xl cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out border-[#8F64E1] text-[#8F64E1] bg-white border hover:bg-[#8F64E1] hover:text-white hover:border-white "
               style={{ padding: "10px" }}
               onClick={addOption}
            >
               + Add more option
            </button>
         </div>
         <div className="text-[12px] font-semibold justify-end flex flex-row itmes-center gap-3 w-full">
            <img src={Timer} alt="Timer" width={20} height={20} />
            <p>00:{timeAllowed}</p>
         </div>
         <div className="w-full flex justify-end items-center gap-5">
            <button
               className="w-[180px] rounded-xl cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out border-[#8F64E1] text-white bg-[#8f64e1] flex flex-row gap-4 items-center justify-center"
               style={{ padding: "10px" }}
               onClick={ViewLive}
            >
               <img alt="Logo Image" src={eye} width={20} height={20} />
               View Live Voting
            </button>
            <button
               className="w-[180px] rounded-xl cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out border-[#8F64E1] text-white bg-[#8F64E1] border hover:bg-white hover:text-[#8F64E1] hover:border-[#8F64E1] "
               style={{ padding: "10px" }}
               onClick={handleSubmission}
            >
               Ask Question
            </button>
         </div>
      </div>
   );
};

export default WriteQuestion;
