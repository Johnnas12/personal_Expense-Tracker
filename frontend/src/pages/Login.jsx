/* eslint-disable no-unused-vars */
import { useState } from "react";
import axiosInstance, { setAuthToken } from "../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
      navigate("/home");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      {message && (
        <div
          className={` fixed top-0 max-w-md w-full bg-${
            isSuccess ? "green" : "red"
          }-100 border border-${isSuccess ? "green" : "red"}-400 text-${
            isSuccess ? "green" : "red"
          }-700 px-4 py-3 rounded relative mb-4`}
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      <div
        className="min-h-screen text-start flex items-center justify-center  bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: "url(bg.jpg)" }}
      >
        <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 bg-opacity-50">
          <h2 className="text-2xl text-gray-900 font-bold mb-6 ">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className=" text-white mb-3 bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log in
              </button>
            </div>
            <p className="text-sm font-light text-black dark:text-gray-400 mb-2">
              i dont have an account
              <Link to="/register">
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline dark:text-blue-500 px-2"
                >
                  Create here
                </a>
              </Link>
            </p>

            <p className="text-sm font-light text-black dark:text-gray-400 mb-2">
              forgot password
              <Link to="/forgotPassword">
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline dark:text-blue-500 px-2"
                >
                  Reset Here
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;