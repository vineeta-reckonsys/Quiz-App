import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate= useNavigate();
    return (
        <><h1>Quiz App</h1><button onClick={() => navigate("/login")} >Login</button><button onClick={() => navigate("/register")}>Register</button></>
    )
}

export default Home;