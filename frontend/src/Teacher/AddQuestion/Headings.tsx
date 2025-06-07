import logo from "@/assets/logo.jpg";
import { useNavigate } from "react-router";
const Headings = () => {
   const navigate = useNavigate()
   return (
      <>
         <div className=" flex flex-col gap-3 w-full m-auto ">
            <img alt="Logo Image" src={logo} className="w-max" />
            <div className="flex flex-col gap-3 justify-center text-left">
               <div className="flex w-full justify-between flex-row items-center ">
                  <p className="xl:text-3xl md:text-xl w-full ">
                     Let's <b>Get Started</b>
                  </p>
                  
               </div>
               <div className="flex w-full justify-between">
                  <p className="xl:text-xl md:text-lg font-normal text-gray-500 w-[60%]">
                     you’ll have the ability to create and manage polls, ask
                     questions, and monitor your students' responses in
                     real-time.
                  </p>
                  <button
                     className="w-[200px] h-[45px] rounded-xl cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out border-[#8F64E1] text-[#8F64E1] bg-white border hover:bg-[#8F64E1] hover:text-white hover:border-white "
                     onClick={()=>navigate('/teacher/view-history')}
                     style={{ padding: "10px" }}
                  >
                     View Past Results
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Headings;
