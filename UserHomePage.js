import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, firestore } from './firebaseConfig';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import './UserHomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [newComments, setNewComments] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsRef = collection(firestore, 'events');
            const eventSnapshot = await getDocs(eventsRef);
            const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventList);
        };

        fetchEvents();

        const fetchUserData = async (userId) => {
            try {
                const userDoc = await getDoc(doc(firestore, 'users', userId));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().firstName || "User");
                } else {
                    setUserName("User");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserName("User");
            }
        };

        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            if (currentUser) {
                fetchUserData(currentUser.uid);
            } else {
                setUserName("Guest");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    const handleLike = (eventId) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [eventId]: true
        }));
    };

    const handleUnlike = (eventId) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [eventId]: false
        }));
    };

    const handleCommentSubmit = (eventId, e) => {
        e.preventDefault();
        if (newComments[eventId]?.trim()) {
            setComments(prevComments => ({
                ...prevComments,
                [eventId]: [...(prevComments[eventId] || []), newComments[eventId]]
            }));
            setNewComments(prevNewComments => ({ ...prevNewComments, [eventId]: '' }));
        }
    };

    const handleNextImage = (eventId, images) => {
        setCurrentImageIndex(prevIndex => ({
            ...prevIndex,
            [eventId]: (prevIndex[eventId] + 1) % images.length
        }));
    };

    const handlePreviousImage = (eventId, images) => {
        setCurrentImageIndex(prevIndex => ({
            ...prevIndex,
            [eventId]: (prevIndex[eventId] - 1 + images.length) % images.length
        }));
    };

    const handleReport = (eventName) => {
        alert(`Event "${eventName}" has been reported. Our moderators will review it shortly.`);
    };

    return (
        <div className="home-page">
            <nav className="navbar">
                <span>Hi, {userName}</span>
                <ul className="nav-links">
                    {userName !== 'Guest' && (
                        <>
                            <li onClick={() => navigate('/userProfile')}>Profile</li>
                            <li onClick={() => navigate('/events')}>My Events</li>
                            <li onClick={() => navigate('/createevent')}>Create An Event</li>
                            <li onClick={() => navigate('/notifications')}>Notifications</li>
                            <li onClick={() => navigate('/followers')}>Followers</li>
                        </>
                    )}
                </ul>
                {userName !== 'Guest' && (
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                )}
            </nav>

            <div className="home-content">
                <h2>Welcome to Eventopia</h2>
                <p>Explore events, interact with the community, and stay connected!</p>

                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        <p>{event.description}</p>

                        {event.images && event.images.length > 0 && (
                            <div className="event-image-carousel">
                                <button
                                    onClick={() => handlePreviousImage(event.id, event.images)}
                                    className="carousel-btn"
                                >
                                    &lt;
                                </button>
                                <img
                                    src={event.images[currentImageIndex[event.id] || 0]}
                                    alt={`${event.name} Event`}
                                    className="event-image"
                                />
                                <button
                                    onClick={() => handleNextImage(event.id, event.images)}
                                    className="carousel-btn"
                                >
                                    &gt;
                                </button>
                            </div>
                        )}

                        <div className="action-buttons">
                            <button
                                onClick={() => handleLike(event.id)}
                                className="like-btn"
                                disabled={likes[event.id]}
                            >
                                Like
                            </button>
                            <button
                                onClick={() => handleUnlike(event.id)}
                                className="unlike-btn"
                                disabled={!likes[event.id]}
                            >
                                Unlike
                            </button>
                            <button
                                onClick={() => handleReport(event.name)}
                                className="report-btn"
                            >
                                Report this Event
                            </button>
                        </div>

                        <div className="comments-section">
                            <h4>Comments</h4>
                            <ul className="comments-list">
                                {(comments[event.id] || []).map((comment, index) => (
                                    <li key={index}>{comment}</li>
                                ))}
                            </ul>
                            <form onSubmit={(e) => handleCommentSubmit(event.id, e)} className="comment-form">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComments[event.id] || ''}
                                    onChange={(e) =>
                                        setNewComments(prevNewComments => ({
                                            ...prevNewComments,
                                            [event.id]: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <button type="submit">Post</button>
                                <button
                                    type="button"
                                    onClick={() => handleReport(event.name)}
                                    className="report-btn"
                                >
                                    Report
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="footer">
                <ul className="footer-links">
                    <li onClick={() => navigate('/about')}>About</li>
                    <li onClick={() => navigate('/privacypolicy')}>Privacy Policy</li>
                    <li onClick={() => navigate('/termsandconditions')}>Terms and Conditions</li>
                    <li onClick={() => navigate('/contactus')}>Contact Us</li>
                </ul>
            </footer>
        </div>
    );
};

export default HomePage;
