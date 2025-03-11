import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/authActions";


interface AuthState {
    user:{
      id:string;
      firstName:string;
      email:string;
    
    } | null;
    loading:boolean,
     
    token:string | null,
    error:string | null,
    success:boolean;
}

const storedToken = localStorage.getItem("token");


const initialState:AuthState = {
    user:null,
    loading:false,
    token:storedToken || null,
    error:null,
    success:false,
}




const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       logout:(state : AuthState) => {
         state.user = null;
         state.token = null;
         localStorage.removeItem("token");
       }
    },
    extraReducers : (builder) => {
   
        builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
          // state.user = action.payload.user;
          // state.token = action.payload.token;
          // localStorage.setItem("token",action.payload.token);
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Registration Failed";
        })
        .addCase(loginUser.pending,(state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action:PayloadAction<{token:string ;user:AuthState["user"]}> ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token",action.payload.token);  
        })
        .addCase(loginUser.rejected,(state,action) => {
          state.loading = false;
          state.error = action.payload ||  "Login Failed";
        })
    },

})



export const {logout} = authSlice.actions;
export default authSlice.reducer;
