import React, { useState } from 'react';
import { loginUser, registerUser } from '../../../../redux/apiRequest';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();
		const newUser = {
			username,
			email,
			password,
		};
		registerUser(newUser, dispatch, navigate);
	};

	return (
		<div className="signUp">
			<div className="container flex flex-c flex-column">
				<div className="section-title">
					<h2>Sign Up</h2>
				</div>
				<form className="signUp-form" method="post" onSubmit={handleRegister}>
					<div className="form-group flex flex-column">
						<label htmlFor="email">email</label>
						<input
							type="text"
							name="email"
							placeholder="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="username">UserName</label>
						<input
							type="text"
							name="username"
							placeholder="username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button className="btn-signUp" type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
