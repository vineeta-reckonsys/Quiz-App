import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import questionsReducer from "./slices/quizSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        questions:questionsReducer,
    },
   });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

