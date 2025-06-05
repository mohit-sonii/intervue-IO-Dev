import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Join from "./Student/Join";
import AddQuestion from "./Teacher/AddQuestion/AddQuestion";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               {/* Student Routes */}
               <Route path="/student/join" element={<Join />} />

               {/* Teacher Routes */}
               <Route path="/teacher/add-question" element={<AddQuestion />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
