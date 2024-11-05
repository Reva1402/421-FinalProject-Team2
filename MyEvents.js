import React, { useEffect, useState } from 'react';
import { firestore, auth } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Styling.css';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchEvents = async () => {
            try {
                const userUid = auth.currentUser?.uid;

                if (!userUid) {

                    navigate('/login');
                    return;
                }
                const eventsRef = collection(firestore, 'events');
                const eventsQuery = query(eventsRef, where('createdBy', '==', userUid));
                const querySnapshot = await getDocs(eventsQuery);
                const eventList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setEvents(eventList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events: ", error);
                setError('Failed to load events. Please try again.');
                setLoading(false);
            }
        };

        fetchEvents();
    }, [navigate]);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1>My Events</h1>

            {events.length === 0 ? (
                <p>No events found. Create one now!</p>
            ) : (
                <ul className="list-group">
                    {events.map((event) => (
                        <li key={event.id} className="list-group-item">
                            <h5>{event.name}</h5>
                            <p>{event.description || 'No description available'}</p>
                            <p><strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/event/${event.id}`)}
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyEvents;
