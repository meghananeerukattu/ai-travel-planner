import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
     const data = await response.json();
if (!response.ok) {
  alert(data.message);
  return;
}
localStorage.setItem("token", data.token);
alert("Login Successful");
navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <div className="page-container">
    <div className="card">
      <h1>AI Travel Planner</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Login
        </button>
      </form>
      <Link className="link" to="/register">
        New User? Register
      </Link>
    </div>
  </div>
);
}

export default Login;