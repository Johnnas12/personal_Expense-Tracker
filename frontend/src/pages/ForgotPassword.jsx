import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/expenses/forgot-password', { name });
            setMessage(response.data.message);
            console.log(response.data.code);
            setIsSuccess(true);
            navigate(`/resetpassword/${response.data.code}`);
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'An error occurred');
            setIsSuccess(false);
            setTimeout(() => {
                setMessage('');
            }, 6000);
        }
    };

    return (
        <>
            {message && (
                <div
                    className={`fixed top-0 max-w-md w-full bg-${isSuccess ? 'green' : 'red'}-100 border border-${isSuccess ? 'green' : 'red'}-400 text-${isSuccess ? 'green' : 'red'}-700 px-4 py-3 rounded relative mb-4`}
                    role="alert"
                >
                    <span className="block sm:inline">{message}</span>
                </div>
            )}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url(bg.jpg)" }}>
                <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 bg-opacity-50">
                    <h2 className="text-2xl text-gray-900 font-bold mb-6">Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Username
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

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="text-white mb-3 bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Request Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
