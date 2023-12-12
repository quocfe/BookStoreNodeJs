import React, { useState, useEffect } from 'react';
import { loginUser } from '../../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import userApi from '../../../../api/client/user';
import './SignIn.css';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const loginError = useSelector((state) => state.auth.login.error);

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await userApi.getAllUser();
			setUsers(response.data);
		};

		fetchUsers();
	}, []);

	const onSubmit = (data) => {
		loginUser(data, dispatch, navigate);
	};

	const validateUsername = (value) => {
		const existingUser = users.find((user) => user.username === value);
		return existingUser ? true : 'Username không tồn tại';
	};

	return (
		<div className="signIn">
			<div className="container flex flex-c flex-column">
				<div className="section-title">
					<h2>Sign In</h2>
				</div>
				<form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group flex flex-column">
						<label htmlFor="username">UserName</label>
						<input
							type="text"
							name="username"
							placeholder="username"
							{...register('username', {
								required: true,
								validate: validateUsername,
							})}
						/>
						{errors.username?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.username?.message && <span>{errors.username.message}</span>}
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="password"
							{...register('password', {
								required: true,
								minLength: 6,
							})}
						/>
						{errors.username?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.password?.type === 'minLength' && (
							<span>Mật khẩu tối thiểu 6 kí tự</span>
						)}
						{loginError ? <span>Mật khẩu không chính xác</span> : ''}
					</div>
					<button className="btn-signin" type="submit">
						Sign In
					</button>
					<p className="link">
						Don't have an account? <Link to="/signup">Sign up</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
