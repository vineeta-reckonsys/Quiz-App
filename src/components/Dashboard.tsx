import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"
import { AppDispatch, RootState } from "../redux/store";
import Quiz from "./Quiz";


const Dashboard=  () => {
    const navigate = useNavigate();
    
    const dispatch = useDispatch<AppDispatch>();
   
    const handleLogout = () => {

        dispatch(logout())
        navigate("/")
    }
    useEffect(() => {
        // dispatch(fetchQuestions())
    },[dispatch])
    return (
        <>
        <div className="container d-flex justify-content-center align-items-center vw-100">
       <h1 className="text-center mt-5 mx-auto">Dashboard</h1>
       <button className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button>
       </div>
       <div className="card  border border-success p-4 shadow " style={{marginTop: "60px" ,width: " 80vw",marginLeft:"10%"}}>
        <p>Demo Test</p>
        <button onClick={() => navigate("/quiz")}>Start Test</button>
       </div>
        </>
    )
}


export default Dashboard;