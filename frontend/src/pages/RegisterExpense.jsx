import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import MultiLevelSidebar from "../components/MultiLevelSidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const RegisterExpense = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/expenses/add",
        {
          amount,
          category,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Expense added successfully");
      setAmount("");
      setCategory("");
      setDescription("");
      navigate("/home");
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 mt-16">
          <MultiLevelSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <main
            className={`flex-1 p-4 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-16"
            } mt-5`}
          >
            <div className="min-h-screen text-start flex items-center justify-center">
              <div className="max-w-md w-full border bg-white shadow-2xl rounded-xl p-6">
                <h2 className="text-2xl text-gray-900 font-bold mb-6 ">
                  Regiseter An Expenses
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="name"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Food">Food </option>
                      <option value="Transportation">Transportation</option>
                      <option value="Housing">Housing</option>
                      <option value="Health">Health & Fitness</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name=""
                      id=""
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="w-full text-white mb-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Register Expenses
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default RegisterExpense;
