import React, { useEffect } from "react";
import {useForm,SubmitHandler} from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authActions";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";


interface RegisterFormInputs {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

const Register  = () => {
  // const {isAuthenticated,loading,userInfo,error,success} = useSelector((state : RootState) => state.auth)
   const dispatch = useDispatch<AppDispatch>()
   const { loading, error, success} = useSelector((state: RootState) => state.auth);
   const {register,handleSubmit} = useForm<RegisterFormInputs>();
   const navigate = useNavigate();

    useEffect(() => {
     if(success){
      navigate("/login")
     }
     if(localStorage.token){
      navigate("/dashboard")
     }
   },[navigate,success,localStorage.token]); 

   const submitForm:SubmitHandler<RegisterFormInputs> = (data) => {
    if(data.password !== data.confirmPassword){
        alert('Password mismatch')
        return;
    }
    const userData = {
        ...data,email:data.email.toLowerCase(),
    }
   
    dispatch(registerUser(userData))
   }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
        <form  onSubmit={handleSubmit(submitForm)}>
          <div  className="mb-3">
            <label htmlFor='firstName' className="form-label" >First Name</label>
            <input
              type='text'
              className='form-control'
              {...register('firstName')}
              required
            />
          </div>
          <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            {...register('email')}
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            {...register('password')}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
          <div  className="mb-3">
            <label className="form-label" htmlFor='email'>Confirm Password</label>
            <input
              type='password'
             className='form-control'
              {...register('confirmPassword')}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type='submit'  disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        </div>
        </div>
   )
}

export default Register;