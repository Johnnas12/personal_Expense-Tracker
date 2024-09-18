/*

...
This is the module responsible for showing the expenses that registered by users
in this module the functionalities (Methods) included are:
fetchExpenses => A method for fetching data according to user from database
handleDelete => A method for deleting
handleAddExpense => A method for adding new expenses
handleSaveClick => A method for saving the edited expenses
... 

*/
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import MultiLevelSidebar from "../components/MultiLevelSidebar";
import Footer from "../components/Footer";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [message, setMessage] = useState("");

  const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/expenses/get",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleEditClick = (expense) => {
    setEditRowId(expense._id);
    setEditedData(expense);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/expenses/${editedData._id}`,
        editedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(
        expenses.map((expense) =>
          expense._id === editedData._id ? response.data : expense
        )
      );
      setEditRowId(null);
      setMessage("Expense Updated Successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(expenses.filter((expense) => expense._id !== id));
        setMessage("Expense Deleted Successfully!");
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        console.error("Error deleting expense", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/expenses/add",
        newExpense,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses([...expenses, response.data]);
      setNewExpense({
        amount: "",
        category: "",
        date: "",
        description: "",
      });
      setShowAddExpenseForm(false);
      setMessage("Expense Added Successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

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
            {message && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {message} </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
              <button
                onClick={() => setShowAddExpenseForm(!showAddExpenseForm)}
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
              >
                <i
                  className={`fas fa-${showAddExpenseForm ? "minus" : "plus"}`}
                ></i>{" "}
                {showAddExpenseForm ? "Cancel" : "Add Expense"}
              </button>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Amount</th>
                    <th className="py-2 px-4 border">Category</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Description</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      {editRowId === expense._id ? (
                        <>
                          <td className="py-2 px-4 border">
                            <input
                              type="number"
                              name="amount"
                              value={editedData.amount}
                              onChange={handleInputChange}
                              className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <select
                              name="category"
                              value={editedData.category}
                              onChange={handleInputChange}
                              className="border rounded w-full py-2 px-3 text-gray-700"
                            >
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-2 px-4 border">
                            <input
                              type="date"
                              name="date"
                              value={
                                new Date(editedData.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }
                              onChange={handleInputChange}
                              className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <input
                              type="text"
                              name="description"
                              value={editedData.description}
                              onChange={handleInputChange}
                              className="border rounded w-full py-2 px-3 text-gray-700"
                            />
                          </td>
                          <td className="py-2 px-4 border">
                            <button
                              onClick={handleSaveClick}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditRowId(null)}
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 px-4 border">{expense.amount}</td>
                          <td className="py-2 px-4 border">
                            {expense.category}
                          </td>
                          <td className="py-2 px-4 border">
                            {new Date(expense.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border">
                            {expense.description}
                          </td>
                          <td className="py-2 px-4 border">
                            <button
                              onClick={() => handleEditClick(expense)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                              {/* <i className="fas fa-edit"></i> */}
                            </button>
                            <button
                              onClick={() => handleDelete(expense._id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {showAddExpenseForm && (
                    <tr>
                      <td className="py-2 px-4 border">
                        <input
                          type="number"
                          name="amount"
                          value={newExpense.amount}
                          onChange={handleNewExpenseChange}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <select
                          name="category"
                          value={newExpense.category}
                          onChange={handleNewExpenseChange}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          type="date"
                          name="date"
                          value={newExpense.date}
                          onChange={handleNewExpenseChange}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          type="text"
                          name="description"
                          value={newExpense.description}
                          onChange={handleNewExpenseChange}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={handleAddExpense}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="py-2 px-4 border font-bold">
                      Total Amount
                    </td>
                    <td className="py-2 px-4 border">{totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ViewExpenses;
