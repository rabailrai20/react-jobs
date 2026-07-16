import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmployer } from "../Services/database";

const EmployerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const employer = loginEmployer(email, password);

    if (!employer) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem(
      "employerid",
      employer.employerid.toString()
    );

    alert("Login Successful!");

    navigate("/employer/dashboard", {
      replace: true,
    });
  };

  return (
    <section className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Employer Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            className="w-full border rounded-lg p-3"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            className="w-full border rounded-lg p-3"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default EmployerLogin;