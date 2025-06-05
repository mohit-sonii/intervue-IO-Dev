import Headings from "./Headings";
import WriteQuestion from "./WriteQuestion";

const AddQuestion = () => {
   return (
      <div className="w-full m-auto justify-center items-center flex">
         <div className="w-[80%] flex justify-center items-center h-screen ">
            <div className="gap-10 flex w-full">
               <Headings />
               <WriteQuestion />
            </div>
         </div>
      </div>
   );
};

export default AddQuestion;
