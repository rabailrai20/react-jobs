import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmployer } from "../Services/database";

const EmployerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const employer = loginEmployer(email, password);

    if (!employer) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem(
      "employerid",
      employer.employerid
    );

    alert("Login Successful!");

    navigate("/employer/dashboard");
  };

  return (
    <section className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Employer Login
        </h1>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            className="w-full border p-3 rounded-lg mb-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            className="w-full border p-3 rounded-lg mb-6"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="w-full bg-indigo-600 text-white p-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>
    </section>
  );
};

export default EmployerLogin;