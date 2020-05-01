import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        const body = {
            username: userData.username,
            email: userData.email,
            password: userData.password
        };
        await axios.post('/api/users', {headers}, JSON.stringify(body));

        console.log(userData);
    };

    return (
        <Fragment>
            <form>
                <label>Username </label>
                <input type='text' placeholder='Username' name='username' onChange={e => onChange(e)} required></input>
                <br />
                <label>Email </label>
                <input type='email' placeholder='e.g myemail@domain.com' name='email' onChange={e => onChange(e)} required></input>
                <br />
                <label>Password </label>
                <input type='password' name='password' onChange={e => onChange(e)} required></input>
                <br />
                <label>Repeat Password </label>
                <input type='password' name='password2' onChange={e => onChange(e)} required></input>
                <br />
                <input type='submit' onClick={e => onSubmit(e)} value='Sign Up'></input>
            </form>
        </Fragment>
    );
};

export default Registration;
