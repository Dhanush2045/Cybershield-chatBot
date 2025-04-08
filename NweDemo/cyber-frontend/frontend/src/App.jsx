import  NavBar  from "./components/NavBar.jsx";
import {Routes,Route,Navigate} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import FileComplaintPage from "./components/FileComplaintPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import ComplaintStatusPage from "./components/ComplaintStatusPage.jsx";
import {useAuthStore} from "../stores/useAuthStore.js";
import { useEffect } from "react";
import {LoaderCircle} from "lucide-react";
import { Toaster } from "react-hot-toast";
import "./App.css";
const App = () => {
  const {authUser,isCheckingAuth,checkAuth} = useAuthStore();
  useEffect(() =>{
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth && !authUser){
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }
  return(
    <div>
      <Toaster />
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
        <Route path="/file-complaint" element={authUser ? <FileComplaintPage /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path="/dashboard" element={authUser ? <ComplaintStatusPage /> : <Navigate to="/login" />}></Route>
      </Routes>
    </div>
  );
}
export default App;