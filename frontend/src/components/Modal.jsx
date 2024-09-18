import React, { useState, useEffect } from 'react';

const EventModal = ({ isOpen, onClose, onSave, selectedDate }) => {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#ffffff'); // Default color

    // Reset input fields whenever the modal opens or closes
    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setColor('#ffffff'); // Reset color picker to default
        }
    }, [isOpen]);

    const handleSave = () => {
        if (title) {
            onSave({ title, start: selectedDate, end: selectedDate, backgroundColor: color });
            onClose();
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Modal content */}
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-50">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 className="text-lg font-semibold">Create New Event</h3>
                        <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 rounded-lg p-2">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Background Color</label>
                            <input
                                id="color"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="mt-1 block w-full p-1 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                {/* Background overlay */}
                <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
            </div>
        )
    );
};

export default EventModal;
