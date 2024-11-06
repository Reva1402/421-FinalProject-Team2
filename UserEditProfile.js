import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './UserEditProfile.css';

const UserEditProfile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchUserProfile = async () => {
                try {
                    const docRef = doc(firestore, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setDisplayName(data.displayName || '');
                        setEmail(data.email || '');
                        setPhoneNumber(data.phoneNumber || '');
                        setAddress(data.address || '');
                    } else {
                        setError('User profile not found. Please check your account.');
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setError('Failed to fetch user profile. Please try again later.');
                }
            };
            fetchUserProfile();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (user) {
                const userDoc = doc(firestore, 'users', user.uid);
                await setDoc(userDoc, {
                    displayName,
                    email,
                    phoneNumber,
                    address,
                }, { merge: true });
                console.log('User document updated successfully in Firestore');

                setPopupMessage('Profile updated successfully!');
                setIsPopupVisible(true);

                setTimeout(() => {
                    setIsPopupVisible(false);
                    navigate('/profile');
                }, 3000);
            } else {
                setError('User is not authenticated.');
            }
        } catch (err) {
            console.error('Update Profile Error:', err);
            setError('Failed to update profile: ' + (err.message || 'Unknown error'));
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); 
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <div className="edit-profile">
            <nav className="navbar">
                <div className="navbar-brand" onClick={() => navigate('/profile')}>
                    Hi, {displayName || 'User'}
                </div>
                <ul className="nav-links">
                    <li className="nav-item" onClick={() => navigate('/profile')}>Profile</li>
                    <li className="nav-item" onClick={() => navigate('/events')}>My Events</li>
                    <li className="nav-item" onClick={() => navigate('/postanevent')}>Post An Event</li>
                    <li className="nav-item" onClick={() => navigate('/notifications')}>Notifications</li>
                    <li className="nav-item" onClick={() => navigate('/followers')}>Followers</li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>

            <h2>Edit Profile</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="displayName">Display Name:</label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled 
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>

            {isPopupVisible && (
                <div className="popup">
                    <p>{popupMessage}</p>
                </div>
            )}

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

export default UserEditProfile;
