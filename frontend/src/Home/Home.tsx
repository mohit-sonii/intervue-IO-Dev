import { useEffect } from "react";
import CardSelection from "./CardSelection";
import Headings from "./Headings";
import toast from "react-hot-toast";

const Home = () => {
   // const currentUser = useSelector((state: RootState) => state.currentUser);
   // const navigate = useNavigate();

   // useEffect(() => {
   //    if (currentUser !== "" && localStorage.getItem('currentUser')!==null) navigate(-1);
   // }, [currentUser, navigate]);

   useEffect(()=>{
      toast.error("Please run locally, as Vercel does not support Websockets. Find the RunLocal.md for setting up")
   },[])

   return (
      <div className="flex justify-center items-center w-full h-screen">
         <div className="flex justify-center items-center xl:gap-15 xl:w-[60%] md:w-[90%] m-auto md:gap-10 h-max ">
            <Headings />
            <CardSelection />
         </div>
      </div>
   );
};

export default Home;
