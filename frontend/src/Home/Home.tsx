import CardSelection from "./CardSelection";
import Headings from "./Headings";


const Home = () => {
   // const currentUser = useSelector((state: RootState) => state.currentUser);
   // const navigate = useNavigate();

   // useEffect(() => {
   //    if (currentUser !== "" && localStorage.getItem('currentUser')!==null) navigate(-1);
   // }, [currentUser, navigate]);

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
