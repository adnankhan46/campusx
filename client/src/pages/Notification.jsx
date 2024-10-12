import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BottomBar from '../components/Bottombar';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
 

const socket = io('http://localhost:3000', { autoConnect: false });

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (!currentUser) return;

        // Connect the socket
        socket.connect();

        // Register the user
        socket.emit('register', currentUser._id);

        socket.on('connect', () => {
            console.log('Connected to socket notification system');
        });

         

        socket.on('notification', (data) => {
            console.log('Notification received:', data);  // Log notification data
            const timestamp = new Date().toLocaleString();
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                { ...data, timestamp },
            ]);
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        // Cleanup function
        return () => {
            socket.off('connect');
            socket.off('newComment');
            socket.off('notification');
            socket.off('connect_error');
            socket.disconnect(); // Disconnect socket when component unmounts
        };
    }, [currentUser]);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className='overflow-x-hidden flex flex-col items-center min-h-screen font-inter bg-white mb-[120px]'>
            <Navbar />
            <p className="text-2xl md:text-4xl font-bold mt-2">All Notifications</p>

            <div className='mt-4 flex flex-col w-full md:w-1/2 items-center h-full px-2'>
                <div className='border border-gray-300 rounded-lg w-full p-4'>
                    {notifications.length === 0 ? (
                        <p className="text-center">You have no notifications yet</p>
                    ) : (
                        <ul className='w-full text-left'>
                            {notifications.map((notification, index) => (
                                <li key={index} className='border-b border-gray-200 py-2'>
                                    <p>{notification.message}</p>
                                    <p className="text-gray-500 text-sm">{`Post ID: ${notification.postId}`}</p>
                                    <p className="text-gray-400 text-xs">{notification.timestamp}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <button 
                onClick={clearNotifications}
                className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg'>
                Clear Notifications
            </button>

            <BottomBar />
        </div>
    );
}

export default Notification;
