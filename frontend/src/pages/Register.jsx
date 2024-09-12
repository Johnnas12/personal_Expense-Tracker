import { useState } from "react";
import axios from "axios";
import SuccessMessage from "../components/SuccessMessage";
import { Link } from "react-router-dom";
import TermsAndConditionsModal from "../components/TermsAndConditionsModal";

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );



      setSuccessMessage("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("")


      setTimeout(() => {
        setSuccessMessage("");
      }, 6000);

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.log("There was an error registering the user:", error);
    }
  };

  return (
    <div
      className="min-h-screen text-start flex items-center justify-center bg-gray-100  bg-cover bg-center "
      style={{ backgroundImage: "url(bg.jpg)" }}
    >
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
  <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 bg-opacity-50">
  <h2 className="text-2xl text-gray-900 font-bold mb-6">
    Create an Account
  </h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        Name <span className="text-red-700">*</span>
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email <span className="text-red-700">*</span>
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
        Password <span className="text-red-700">*</span>
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

    <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>

    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="terms"
          aria-describedby="terms"
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
          required
        />
      </div>
      <div className="ml-3 mb-3 text-sm">
        <label className="font-light text-black dark:text-gray-300">
          I accept the{" "}
          <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="font-medium text-red-600 hover:underline dark:text-blue-500"
                >
                  Terms and Conditions
                </button>
        </label>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="text-white mb-3 bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Account
      </button>
    </div>
    <p className="text-sm font-light text-black dark:text-gray-400 mb-2">
      Already have an account?
      <Link to={"/login"}>
        <a
          href="#"
          className="font-medium text-red-600 hover:underline dark:text-blue-500 px-2"
        >
          Login here
        </a>
      </Link>
    </p>
  </form>
</div>
<TermsAndConditionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Register;
