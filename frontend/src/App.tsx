import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Join from "./Student/Join";
import AddQuestion from "./Teacher/AddQuestion/AddQuestion";
import QuestionsDisplay from "./Student/QuestionsDisplay";
import HistoryPoll from "./Teacher/SeeHistory/HistoryPoll";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               {/* Student Routes */}
               <Route path="/student/join" element={<Join />} />
               <Route path="/student/questions"element={<QuestionsDisplay/>}/>

               {/* Teacher Routes */}
               <Route path="/teacher/add-question" element={<AddQuestion />} />
               <Route path="/teacher/view-history" element={<HistoryPoll />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
