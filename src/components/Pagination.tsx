import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setCurrentPage } from "../redux/slices/quizSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, currentPage } = useSelector(
    (state: RootState) => state.questions
  );

  const totalPages = questions.length;

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => dispatch(setCurrentPage(index + 1))}
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: currentPage === index + 1 ? "blue" : "gray",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;