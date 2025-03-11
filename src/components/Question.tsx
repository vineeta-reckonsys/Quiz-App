import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { saveAnswer } from "../redux/actions/quizActions";

interface Question{
  id:number,
  text:string,
  choices:string[]
}

interface QuestionProps {
question:Question,

onAnswerSelect:(question_id:number,answer:number) => void;  
} 

const Question = (props:QuestionProps) => {
    // const Question = props.question.Question;
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [saved,setSaved] = useState<boolean>(false);
  
    const dispatch = useDispatch<AppDispatch>();

   const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    
    const answer = event.target.value;
          setSelectedAnswer(answer);
          props.onAnswerSelect(props.question.id,Number(answer));
          setSaved(false);

   }
   const handleSave = async() => {
     if(!selectedAnswer) return alert("Please select an answer");
     const token= localStorage.getItem("token")
     if(!token) alert("user not authenticated") 
      
    const answer = props.question.choices.indexOf(selectedAnswer);
   
     dispatch(saveAnswer({question_id:props.question.id,answer,token}))
      setSaved(true);
   }
       return (
        <div className="card  items-align-center  ">
        <div className="card-header">
          {props.question.text}
        </div>
        <div className="card-body">
           <ul className="list-unstyled">
         {props.question.choices.map((choice,index) => (
            <li key={index} className={`list-group-item p-3 items-align-center`}><input  className="form-check-input" type="radio" name={choice} onChange={handleChange} value={choice} checked={selectedAnswer === choice} />
              <label htmlFor={`option-${props.question.id}-${index}`} className="form-check-label mx-3 ">
              {choice}
            </label>
            </li>
         ))}
        </ul>
         </div>

      <button className="btn btn-primary mt-3" onClick={handleSave}>
        Save Answer
      </button>
        {/* <div className="w-200px vh-200px">{props.question.text}</div> */}
      
        </div>
    )
}

export default Question;