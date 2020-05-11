import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const onChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        const body = {
            username: userData.username,
            password: userData.password
        };
        let response = await axios.post('/api/auth', JSON.stringify(body), {headers});
        console.log(response);
        
        if (response.status === 200) {
            console.log('Logged in');
            
        }
    };

    return (
        <Fragment>
            <form>
                <label>Username </label>
                <input type='text' placeholder='Username' name='username' onChange={e => onChange(e)} required></input>
                <br />
                <label>Password </label>
                <input type='password' name='password' onChange={e => onChange(e)} required></input>
                <br />
                <input type='submit' onClick={e => onSubmit(e)} value='Sign In'></input>
            </form>
        </Fragment>
    );
};

export default Login;
