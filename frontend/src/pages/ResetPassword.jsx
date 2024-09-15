import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword =  () => {
    //const { code } =  useParams(); 
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const url = new URL(window.location.href);
        const codeFromUrl = url.pathname.split('/').pop();
        setCode(codeFromUrl);
    }, []);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
          }
        try {
            console.log(code); // Ensure the reset code is logged correctly
            
            const response = await axios.post(`http://localhost:5000/api/expenses/reset-password/${code}`, {
                newPassword,
            });
           
            setMessage(response.data.message);
            setIsSuccess(true);
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'An error occurred');
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 6000);
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
                    <h2 className="text-2xl text-gray-900 font-bold mb-6">Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                New Password <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="text-white mb-3 bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
