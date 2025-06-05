import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/currentUserReducer";
import { useNavigate } from "react-router";

const ContinueButton = ({studentClick,teacherClick}:{studentClick:boolean,teacherClick:boolean}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const moveNext=()=>{
        if(!studentClick && !teacherClick){
            toast.error("Please Select a Role")
            return;
        }
        dispatch(setUser(studentClick ? 'Student':'Teacher'))
        localStorage.setItem('currentUser',studentClick? 'Student':'Teacher')
        const route = studentClick ? 'student/join' : 'teacher/add-question'
        navigate(`/${route}`,{replace:true})
    }

   return (
      <div
         className="rounded-3xl cursor-pointer font-semibold text-md transition-all duration-300 ease-in-out text-white bg-[#8F64E1] border border-transparent hover:bg-white hover:text-[#8F64E1] hover:border-[#8F64E1] "
         style={{ padding: "17px 70px" }}
         onClick={()=>moveNext()}
      >
         Continue
      </div>
   );
};

export default ContinueButton;
