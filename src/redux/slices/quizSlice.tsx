
import { createSlice} from "@reduxjs/toolkit";
import { fetchQuestions, saveAnswer, submitTest } from "../actions/quizActions";


export interface Question {
    id:number,
    text:string,
    choices:string[]
} 

interface Answer{
    question_id:number;
    answer:number;
    response?:any;
}
interface QuizState {
    questions:Question[];
  answers: Answer[];
  loading: boolean;
  error: string | null;
  testSubmitted: boolean;
  score: { [key: number]: boolean } | null;
  percentageScore: number | null;
}

const initialState:QuizState = {
    questions: [],
    answers: [],
    loading: false,
    error: null,
    testSubmitted: false,
    score: null,
    percentageScore: null,
}

const quizSlice = createSlice({
    name: "questions",
    initialState,
    reducers:{
        // setCurrentPage:(state,action) => {
        //     state.currentPage = action.payload;
        // }
    },
    extraReducers:(builder) => {
 builder.addCase(fetchQuestions.pending,(state,action) => {
    state.loading = true;
    state.error = null;
 })
 builder.addCase(fetchQuestions.fulfilled,(state,action) => {
    state.loading = false;
    state.questions = action.payload;
 })
 builder.addCase(fetchQuestions.rejected,(state,action) => {
    state.loading = false;
    state.error = action.payload || "Rejected";
 })
 .addCase(saveAnswer.fulfilled,(state,action) => {
    const {question_id,answer,response} = action.payload;
    const existingIndex = state.answers.findIndex((a) => a.question_id === question_id)
    if(existingIndex !== -1){
        state.answers[existingIndex].answer = answer;
    }
    else{
        state.answers.push({question_id,answer,response});
    }
 })
.addCase(submitTest.fulfilled,(state,action) => {
    state.testSubmitted = true;
    state.score = action.payload;

    const correctAnswers = Object.values(action.payload).filter((isCorrect) => isCorrect).length;
    const totalQuestions = Object.keys(action.payload).length;
    state.percentageScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
 
})
.addCase(submitTest.rejected,(state,action) => {
    state.error = action.payload as string;
})
 

    }

})
// export const {setCurrentPage} = quizSlice.actions;
export default quizSlice.reducer;