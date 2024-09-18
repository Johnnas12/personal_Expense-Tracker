/* eslint-disable no-unused-vars */
// Profile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Fetch the profile data when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile({
                    name: response.data.name,
                    email: response.data.email,
                    password: '',
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    // Handle form submission to update the profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/users/profile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Profile updated successfully');
            setIsSuccess(true);
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage(error.response?.data?.message || 'An error occurred');
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">User Profile</h2>
                {message && (

                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> {message} </span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={profile.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
