import { useState } from "react";
import ContinueButton from "./ContinueButton";

const CardSelection = () => {
   const [studentClick, setStudentClick] = useState(false);
   const [teacherClick, setTeacherClick] = useState(false);

   const updateBorder = (whichOne: string) => {
      if (whichOne == "Student") {
         setStudentClick(true);
         setTeacherClick(false);
      } else {
         setStudentClick(false);
         setTeacherClick(true);
      }
   };
   return (
      <>
         <div className="flex flex-row w-full justify-between items-center gap-10">
            <div
               className={`items-center flex flex-col gap-2 bg-white  text-left xl:w-[370px] md:w-[340px] border border-[#d9d9d9] rounded-md shadow-md shadow-gray-400/30 cursor-pointer ${
                  studentClick && "outline-[#1D688D66] outline-solid outline-2"
               }`}
               style={{ padding: "15px 17px" }}
               onClick={() => updateBorder("Student")}
            >
               <p className="w-full font-bold text-xl">I'm a Student</p>
               <p className="w-full font-normal text-sm">
                  Improve your knowledge by answering the questions posted by
                  your teacher.
               </p>
            </div>
            <div
               className={`items-center flex flex-col gap-2 bg-white  text-left xl:w-[370px] md:w-[340px] border border-[#d9d9d9]  rounded-md shadow-md shadow-gray-400/30  cursor-pointer p-4 ${
                  teacherClick && "outline-[#1D688D66] outline-solid outline-2 "
               }`}
               style={{ padding: "15px 17px  " }}
               onClick={() => updateBorder("Teacher")}
            >
               <p className="w-full font-bold text-xl">I'm a Teacher</p>
               <p className="w-full font-normal text-sm">
                  Add questions, manage participants, view poll history and many
                  more in real time
               </p>
            </div>
         </div>
         <ContinueButton studentClick={studentClick} teacherClick={teacherClick}/>
      </>
   );
};

export default CardSelection;
