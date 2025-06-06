import logo from '@/assets/logo.jpg'
import { DotLoader } from 'react-spinners';

const Loading = () => {
   return (
      <div className="w-full flex flex-col gap-10 h-screen justify-center items-center">
         <div className="flex flex-col justify-center w-[70%] items-center gap-5">
            <img alt="Logo Image" src={logo} />
            <div className="flex flex-col gap-5 justify-center items-center text-center">
                <DotLoader color="#8F64E1" size={80} />
               <p className="xl:text-3xl md:text-xl w-full ">
                  <b>Wait for teacher to ask questions..</b>
               </p>
               
            </div>
         </div>
      </div>
   );
};

export default Loading;
