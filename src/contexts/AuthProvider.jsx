import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../libs/axios';
import { toast } from "react-toastify";

export const AuthContext = createContext({});

const AuthProvider = (props) => {

	const router = useNavigate();

	const [token, setToken] = useState("");
	const [auth, setAuth] = useState({
		name: "",
		email: "",
		avatar: "",
	})

	const signup = async (data) => {
		try {
			const response = await api.post('/auth/signup', data);
			if (response.status == 200) {
				toast.success("SignUp Success");
				setAuth({ ...response.data.payload });
				router('/');
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	}

	const signin = async (data) => {
		try {
			const response = await api.post('/auth/signin', data);
			if (response.status == 200) {
				toast.success("SignIn Success");
				localStorage.setItem('token', response.data.payload);
				setToken(response.data.payload);
				checkAuth();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	}

	const checkAuth = async () => {
		try {
			const localToken = localStorage.getItem("token");
			if (!localToken) return router('/');
			api.defaults.headers.common['Authorization'] = "Bearer " + localToken;
			const response = await api.get('/auth/checkAuth');
			if (response.status == 200) {
				localStorage.setItem('token', response.data.payload);
				setToken(response.data.payload);
				router('/slack');
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	}

	useEffect(() => {
		if (!token) checkAuth();
	}, [token])


	return (
		<AuthContext.Provider value={{ ...props.value, auth, token, signup, signin }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;