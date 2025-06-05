// Can be of three types

/*
    • When a user visits a route which is not avaiable in this way we give NOT FOUND Page
    • When a student try to visit Teacher route and vice versa we can give UNAUTHORISED Page
    • When a user who choose nothing out of two and try to visit any route, we can give UNAUTHENTICATED Page

*/

import bot from "../assets/Bot Error.png";

const AuthErrors = ({ typeOfError }: { typeOfError: string }) => {
   return (
      <div className="w-screen h-screen bg-white flex p-0 m-auto  justify-center">
         <div className="xl:w-[50%] lg:w-[80%] sm:w-[95%] h-max  rounded-md justify-center items-center flex flex-row gap-2" style={{"margin":'20px'}}>
            <div className="flex ">
               <img src={bot} alt="Bot" width={300} height={300} />
            </div>
            <div className="flex gap-2 flex-col">
               <p>
                  <span className="font-bold text-gray-800 lg:text-4xl md:text-3xl sm:text-2xl">Oopsie !!</span>
                  <span className="text-gray-600 font-semibold lg:text-3xl md:text-2xl sm:text-xl flex ">
                      {typeOfError=='NOT FOUND'? 'Page Not Found !!' : `You are ${typeOfError}`}
                  </span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default AuthErrors;
