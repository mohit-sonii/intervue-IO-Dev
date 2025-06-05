import logo from "@/assets/logo.jpg";
const Headings = () => {
   return (
      <>
         <div className=" flex flex-col gap-3 w-full m-auto">
            <img alt="Logo Image" src={logo} className="w-max" />
            <div className="flex flex-col gap-3 justify-center text-left">
               <p className="xl:text-3xl md:text-xl w-full ">
                  Let's <b>Get Started</b>
               </p>
               <p className="xl:text-xl md:text-lg font-normal text-gray-500 w-[60%]">
                  you’ll have the ability to create and manage polls, ask
                  questions, and monitor your students' responses in real-time.
               </p>
            </div>
         </div>
      </>
   );
};

export default Headings;
