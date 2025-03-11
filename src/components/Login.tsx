import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/authActions";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";


interface LoginFormInputs {
    email: string;
    password: string;
  }

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {loading,error,token} = useSelector((state:RootState) => state.auth);
    const {handleSubmit} = useForm<LoginFormInputs>();  
  
     useEffect(() => {
        if(token){
            navigate("/dashboard");
        }
     },[token,navigate]);

     const submitForm:SubmitHandler<LoginFormInputs> = (data) => {
        dispatch(loginUser({email:data?.email?.toLowerCase(),password:data.password}));
     }
 
        return(
                
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center">Login</h3>

                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn btn-primary w-100">{loading ? "Logging in..." : "Login"}</button>
                </form>
            </div>
        </div>
        )    
        

}

export default Login;