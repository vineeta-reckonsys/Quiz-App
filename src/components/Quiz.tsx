import React ,{useEffect,useState} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { fetchQuestions, submitTest } from "../redux/actions/quizActions";
import { RootState,AppDispatch } from "../redux/store";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
import Result from "./Result";


const Quiz = () => {
  const [selectedQuestion,setSelectedQuestion] = useState<number>(0);
  const [selectedAnswer,setSelectedAnswer] = useState<{[key:number]: string }>({});
 
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {questions,loading,error, testSubmitted,answers,score,percentageScore} = useSelector((state:RootState) => state.questions);
  
  // const totalPages = Math.ceil(questions.length)
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if(token)
    dispatch(fetchQuestions(token));
    
  },[dispatch])

  useEffect(() => {
    navigate("#1")
  },[])

  
  if (loading) return <div className="spinner-border text-primary" role="status"></div>;
  if(error) return <p>Error : {error}</p>
 if(!questions.length) return <p>No questions</p>
  

  const handleClick = (id:number) => {
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      setSelectedQuestion(index);
    }
    
  }

  const handleNext = () => {
    const index = selectedQuestion;
    setSelectedQuestion(selectedQuestion+1);
    navigate(`#${index+2}`)
  }

  const handleAnswerSelect = (question_id: number, answer: number): void => {
    setSelectedAnswer((prev : any) => ({...prev,[question_id]: answer}))
  }

  const handleSubmit = () => {
    if(token) dispatch(submitTest({token}))
  }

 
   if(testSubmitted){
    return <Result />
   }
     return (
      <div>
        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {questions?.map((question) => (
            <li key={question.id} className="page-item" style={{
              margin: "5px",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
            }}
              onClick={() => handleClick(question.id)}
            >
              <button
    className="page-link"
    onClick={() => handleClick(question.id+1)}
    style={{ border: "none", cursor: "pointer", background: "none" }}
  > <a href={`#${question.id}`} className="link-style-none"> {question.id}</a>  </button>
            </li>
        
          ))}
        </ul>
        
        <Question question={questions[selectedQuestion]} onAnswerSelect={handleAnswerSelect}/>

        <button className="btn btn-primary m-4" onClick={handleNext} disabled={questions.length == selectedQuestion+1}>Next</button>

        {questions.length== selectedQuestion+1 && <button onClick={handleSubmit}>Submit Test</button>}
      </nav>
     
       </div>
    )
   
}

export default Quiz;