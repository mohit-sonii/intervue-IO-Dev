/* eslint-disable react-hooks/exhaustive-deps */
import logo from "@/assets/logo.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentname } from "../reducers/studentNameReducer";
import {type RootState } from "../store";
import { useNavigate } from "react-router";

const Join = () => {
   const [name, setName] = useState<string>("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const studentName = useSelector((state:RootState)=>state.studentName)

   const moveForward = () => {
      dispatch(studentname(name));
      navigate(`/student/questions`);
   };
   useEffect(() => {
      if (studentName != "") {
         navigate(`/student/questions`);
      }
   }, [navigate]);
   return (
      <div className="w-full flex flex-col gap-10 h-screen justify-center items-center">
         <div className="flex flex-col justify-center w-[70%] items-center gap-5">
            <img alt="Logo Image" src={logo} />
            <div className="flex flex-col gap-3 justify-center text-center">
               <p className="xl:text-3xl md:text-xl w-full ">
                  Let's <b>Get Started</b>
               </p>
               <p className="xl:text-lg md:text-md font-normal text-gray-500">
                  As a student, you’ll be able to submit your answers,
                  participate in live polls, and see how your responses compare
                  with your classmates
               </p>
            </div>
         </div>
         <div className="w-[30%] flex flex-col  gap-5">
            <p className="font-normal text-md flex text-start w-full">
               Enter your Name
            </p>
            <input
               type="text"
               value={name}
               style={{ padding: "10px" }}
               className="w-full outline-0 bg-[#F1f1f1] rounded-md font-normal text-md"
               onChange={(e) => setName(e.target.value)}
            />
         </div>
         <div>
            <button
               className=" w-max rounded-4xl cursor-pointer font-semibold text-md transition-all duration-300 ease-in-out text-white bg-[#8F64E1] border border-transparent hover:bg-white hover:text-[#8F64E1] hover:border-[#8F64E1] "
               style={{ padding: "15px 80px" }}
               onClick={moveForward}
            >
               Continue
            </button>
         </div>
      </div>
   );
};

export default Join;
