import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../libs/axios';
 import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = (props) => {

	const router = useNavigate();

	const [token, setToken] = useState("");
	const [auth, setAuth] = useState({
		id: "",
		email: "",
		avatar: "",
		status: -2,
		username: "",
	})

	const signup = async (data) => {
		try {
			const response = await api.post('/auth/signup', data/* , { headers: { "Content-Type": "multipart/form-data" } } */);
			if (response.status == 200) {
				toast("SignUp success", { type: "success" })
				setAuth({ ...response.data.payload });
				router('/');
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}

	const signin = async (data) => {
		try {
			const response = await api.post('/auth/signin', data);
			if (response.status == 200) {
				toast("SignIn Success", { type: 'success' });
				localStorage.setItem('token', response.data.token);
				setToken(response.data.token);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}

	const logOut = () => {
		setToken('');
		setAuth({});
	}

	const checkAuth = async () => {
		try {
			const localToken = localStorage.getItem("token");
			if (!localToken) return router('/');
			api.defaults.headers.common['Authorization'] = "Bearer " + localToken;
			const response = await api.get('/auth/checkAuth');
			if (response.status == 200) {
				setAuth(response.data.user);
				router('/slack');
			} else {
				logOut();
			}
		} catch (error) {
			logOut();
		}
	}

	useEffect(() => {
		checkAuth();
		//eslint-desable-next-line
	}, [token]);

	return (
		<AuthContext.Provider value={{ ...props.value, auth, token, signup, signin }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;