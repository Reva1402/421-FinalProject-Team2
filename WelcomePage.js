import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { ref, set, get } from 'firebase/database';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobilenumber: '',
        password: '',
        gender: '',
        role: '',
        address: '',
        country: '',
        province: ''

    });
    const [provinces, setProvinces] = useState([]);
    const [error, setError] = useState('');



    const navigate = useNavigate();






    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });


        if (name === 'country') {
            handleCountryChange(value);
        }
    };


    const handleCountryChange = (country) => {
        if (country === 'Canada') {
            setProvinces([
                'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
                'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'
            ]);
        } else if (country === 'USA') {
            setProvinces([
                'California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania'
            ]);
        } else {
            setProvinces([]);
        }
    };




    const handleSignup = async (e) => {
        e.preventDefault();


        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.mobilenumber || !formData.gender || !formData.role || !formData.address || !formData.country) {
            setError('Please fill all required fields.');
            return;
        }


        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }


        if (formData.password.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }

        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await set(ref(database, 'users/' + user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobilenumber: formData.mobilenumber,
                password: formData.password,
                gender: formData.gender,
                role: formData.role,
                address: formData.address,
                country: formData.country,
                province: formData.province
            });

            console.log('User signed up and document created:', user);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
      };





    return (
        <div className="signup-container">
            <div className="form-wrapper">
                <h1 className='text-center'>Sign Up</h1>

                <form onSubmit={handleSignup}>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Mobile Number</label>
                        <input
                            type='number'
                            className='form-control'
                            name='mobilenumber'
                            value={formData.mobilenumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <div className="gender-group">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="female">Female</label>
                            <input
                                type="radio"
                                id="custom"
                                name="gender"
                                value="Custom"
                                checked={formData.gender === 'Custom'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="custom">Others</label>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Role</label>
                        <select
                            className='form-control'
                            name='role'
                            value={formData.role}
                            onChange={handleInputChange}
                            required>
                            <option value=''>Select</option>
                            <option value='standarduser'>Standard User</option>
                            <option value='moderator'>Moderator</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Address</label>
                        <input
                            type='text'
                            className='form-control'
                            name='address'
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <select
                            className="form-control"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Canada">Canada</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>

                    {formData.country && (
                        <div className="form-group">
                            <label>Province</label>
                            <select
                                className="form-control"
                                name="province"
                                value={formData.province}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select</option>
                                {provinces.map((province, index) => (
                                    <option key={index} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="button-group-signup">
                        <button type='submit' className='signup-btn-custom'>
                            Sign Up
                        </button>
                        <button className="btn btn-custom" onClick={handleLoginClick}>Login</button>

                    </div>
                </form>
            </div>
        </div>




    );
};

export default SignupPage;
