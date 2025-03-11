import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Result = () => {
    const { testSubmitted,answers,percentageScore} = useSelector((state:RootState) => state.questions);
   
    return (
        <div className="card p-4">
          <h3>Test Submitted Successfully! 🎉</h3>
          <h5>Your Score:</h5>
          <p className="mt-3 text-primary"><strong>{percentageScore}%</strong></p>
        </div>
    )
}

export default Result