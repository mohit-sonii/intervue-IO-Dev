import logo from "../assets/logo.jpg";
const Headings = () => {
   return (
      <>
         <img alt="Logo Image" src={logo} />
         <div className="flex flex-col gap-3 justify-center text-center">
            <p className="xl:text-3xl md:text-xl w-full ">
               Welcome to the <b>Live Polling System</b>
            </p>
            <p className="xl:text-xl md:text-lg font-medium text-gray-500">
               Please select the role that best describes you to begin using the
               live polling system
            </p>
         </div>
      </>
   );
};

export default Headings;
