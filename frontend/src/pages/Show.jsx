import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';
import Header from '../components/Header';
import MultiLevelSidebar from '../components/MultiLevelSidebar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const ViewExpenses = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [editRowId, setEditRowId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [newExpense, setNewExpense] = useState({
        amount: '',
        category: '',
        date: '',
        description: ''
    });
    const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

    const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/expenses/get', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses', error);
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
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/expenses/${editedData._id}`, editedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(expenses.map(expense => expense._id === editedData._id ? response.data : expense));
            setEditRowId(null);
            alert('Expense updated successfully');
        } catch (error) {
            console.error('Error updating expense', error);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        
        if(isConfirmed){
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(expenses.filter(expense => expense._id !== id));
            alert('Expense deleted successfully');
        } catch (error) {
            console.error('Error deleting expense', error);
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
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/expenses/add', newExpense, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses([...expenses, response.data]);
            setNewExpense({
                amount: '',
                category: '',
                date: '',
                description: ''
            });
            setShowAddExpenseForm(false);
            alert('Expense added successfully');
        } catch (error) {
            console.error('Error adding expense', error);
        }
    };

    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    const columns = [
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
            cell: row => editRowId === row._id ? (
                <input
                    type="number"
                    name="amount"
                    value={editedData.amount}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                />
            ) : row.amount
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
            cell: row => editRowId === row._id ? (
                <select
                    name="category"
                    value={editedData.category}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            ) : row.category
        },
        {
            name: 'Date',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
            cell: row => editRowId === row._id ? (
                <input
                    type="date"
                    name="date"
                    value={new Date(editedData.createdAt).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                />
            ) : new Date(row.createdAt).toLocaleDateString()
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            cell: row => editRowId === row._id ? (
                <input
                    type="text"
                    name="description"
                    value={editedData.description}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                />
            ) : row.description
        },
        {
            name: 'Actions',
            cell: row => editRowId === row._id ? (
                <>
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
                </>
            ) : (
                <>
                    <button
                        onClick={() => handleEditClick(row)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                        <i className='fas fa-edit'></i>
                        
                    </button>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                        <i className='fas fa-trash'></i>
                    </button>
                </>
            )
        }
    ];

    const data = expenses.map(expense => ({
        ...expense,
        createdAt: new Date(expense.createdAt).toLocaleDateString()
    }));

    const tableData = {
        columns,
        data,
        exportHeaders: true,
        exportFileName: 'expenses',
    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header toggleSidebar={toggleSidebar} />
                <div className="flex flex-1 mt-16">
                    <MultiLevelSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} mt-5`}>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
                            <button
                                onClick={() => setShowAddExpenseForm(!showAddExpenseForm)}
                                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                            >
                                <i className={`fas fa-${showAddExpenseForm ? 'minus' : 'plus'}`}></i> {showAddExpenseForm ? 'Cancel' : 'Add Expense'}
                            </button>
                            {showAddExpenseForm && (
                                <div className="mb-4">
                                    <input
                                        type="number"
                                        name="amount"
                                        value={newExpense.amount}
                                        onChange={handleNewExpenseChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
                                        placeholder="Amount"
                                    />
                                    <select
                                        name="category"
                                        value={newExpense.category}
                                        onChange={handleNewExpenseChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newExpense.date}
                                        onChange={handleNewExpenseChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={newExpense.description}
                                        onChange={handleNewExpenseChange}
                                        className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
                                        placeholder="Description"
                                    />
                                    <button
                                        onClick={handleAddExpense}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            )}
                            <DataTableExtensions {...tableData}>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    selectableRows
                                    export
                                />
                            </DataTableExtensions>
                            <div className="mt-4 font-bold">Total Amount: {totalAmount}</div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ViewExpenses;
