import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterUserArgs {
    firstName: string;
    email: string;
    password: string;
   }
  
  interface AuthResponse {
    token:string;
    user: {
      id: string;
      firstName: string;
      email: string;
    };
  }

  const backendURL = "http://localhost:8080"


export const registerUser = createAsyncThunk<string,RegisterUserArgs,{rejectValue:string}>(
    'auth/register',async({firstName, email,password},{rejectWithValue}) => {
        try {
            const config = {
                headers:{
                    'Content-Type':"application/json",
                },
            }
            const response = await axios.post(`${backendURL}/register`,
               {firstName,email,password},config)
               
               return response.data.message;
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Registration failed";
          return rejectWithValue(errorMessage); 
      
        }
    }
  )
  
  export const loginUser = createAsyncThunk<
  AuthResponse,{email:string,password:string},{rejectValue:string}>(
  "auth/login",async({email,password},{rejectWithValue}) => {
    try {
      const config = {headers: {"Content-Type":"application/json"}};
  
      const {data} = await axios.post<AuthResponse>(
        `${backendURL}/login`,
        {email,password},
        config
      )
      if(data.token){
          localStorage.setItem("token",data.token);
      }
    else{
      throw new Error("Token not received");
    }
      return data;
    } catch (error : any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      return rejectWithValue(errorMessage); 
  
    }
  }
  )