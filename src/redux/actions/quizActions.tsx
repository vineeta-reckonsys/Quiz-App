import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Question {
    id:number,
    text:string,
    choices:string[]
} 


export const fetchQuestions = createAsyncThunk<Question[],string,{rejectValue:string}>(
    "questions/fetchQuestions",async (token,{rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:8080/questions",{
             headers:{
                Authorization:`Bearer ${token}`,
             }
            });
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch questions");
        }
    }
)


const backendURL = "http://localhost:8080"


export const saveAnswer = createAsyncThunk("quiz/saveAnswer",async({question_id,answer,token}:{question_id:number,answer:number,token:string | null},{rejectWithValue}) => {
    try {
                    const config = {
                        headers:{
                            Authorization:`Bearer ${token}`,
                         }
                    }
                    const response = await axios.post(`${backendURL}/response`,
                     {question_id,answer},config)
                       
                       return {question_id,answer,response:response.data};
                } catch (error: any) {
                  const errorMessage = error.response?.data?.message || "Saving Failed";
                  return rejectWithValue(errorMessage); 
              
                }
})

export const submitTest = createAsyncThunk("quiz/submitTest",async({token}:{token: string},{rejectWithValue}) => {
   try {
    const response = await axios.get(`${backendURL}/result`,{
       headers: {Authorization:`Bearer ${token}`},
    });
    return response.data.score;
   } catch (error:any) {
    const errorMessage = error.response?.data?.message || "Submission Failed";
    return rejectWithValue(errorMessage); 

   }
})