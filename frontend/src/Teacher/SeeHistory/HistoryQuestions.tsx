import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { type getQuestionType } from "../../types";
import { DotLoader } from "react-spinners";

const HistoryQuestions = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [question, setQuestion] = useState<getQuestionType[]>([]);

   useEffect(() => {
      const result = async () => {
         try {
            const loadToast = toast.loading("Please wait...");
            const apiCall = await axios.get(
               "http://localhost:3000/teacher/get-all-questions"
            );
            if (apiCall.data) {
               setQuestion(apiCall.data.data);
            }
            setLoading(false);
            toast.dismiss(loadToast);
         } catch (err) {
            console.log(err);
            return;
         }
      };
      result();
   }, []);

   return (
      <div
         className="flex w-full h-full m-auto justify-center flex-col  gap-5  items-center"
         style={{ padding: "20px" }}
      >
         {question.length > 0 && (
            <p
               className="text-[22px] font-semibold "
               style={{ marginTop: "20px" }}
            >
               History
            </p>
         )}
         {loading && (
            <div
               className="w-max flex flex-col gap-5 justify-center items-center "
               style={{ marginTop: "50px" }}
            >
               <DotLoader color="#8f64e1" size={100} />
               <p className="text-[25px] font-semibold ">
                  Gettings things ready...
               </p>
            </div>
         )}
         {question.length > 0 && (
            <div className="w-[40%] flex h-max gap-6 justify-center items-center ">
               {question.map((item) => (
                  <div className="w-full  justify-center  flex h-max bg-white  text-[17px] rounded-md border-[1px] border-[#8F64E1] ">
                     <div
                        style={{ padding: "15px", borderRadius: "5px 5px 0 0" }}
                        className="font-normal flex items-center text-sm  h-max w-full bg-gradient-to-r from-[#343434] to-[#6E6E6E] text-white "
                     >
                        {item.questionName}
                     </div>
                     <div
                        className="w-[95%] items-center justify-center flex b-red-400"
                        style={{ padding: "10px" }}
                     >
                        <div className=" items-center justify-center w-full rounded-md">
                           {item.options.map((i, index) => {
                              const votePercent =
                                 item.totalVotes > 0
                                    ? Math.round(
                                         (i.votes / item.totalVotes) * 100
                                      )
                                    : 0;

                              return (
                                 <div
                                    key={index}
                                    className={`relative group h-max w-full rounded-md border-[1px] overflow-hidden border-[#8f64e1] bg-[#f9f9f9]`}
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
                                             className={`w-[25px] h-[25px] flex items-center justify-center rounded-full text-[10px] font-bold 
                   text-[#a3a1a1] bg-[#dbd9d9]`}
                                          >
                                             {index + 1}
                                          </p>
                                          <span className="font-medium text-black">
                                             {i.optionText}
                                          </span>
                                       </div>

                                       <div className="text-sm  text-black font-semibold">
                                          {votePercent}%
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default HistoryQuestions;
