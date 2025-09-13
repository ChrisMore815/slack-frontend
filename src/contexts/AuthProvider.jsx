import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../libs/axios';
// import toast from '../libs/toast'
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = (props) => {

	const router = useNavigate();

	const [token, setToken] = useState("");
	const [auth, setAuth] = useState({
		id: "",
		email: "",
		avatar: "",
		username: "",
	})

	const signup = async (data) => {
		try {
			const response = await api.post('/auth/signup', data/* , { headers: { "Content-Type": "multipart/form-data" } } */);
			if (response.status == 200) {
				// toast.success("SignUp Success")
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
				toast.success("SignIn Success");
				localStorage.setItem('token', response.data.token);
				setToken(response.data.token);
				checkAuth();
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
			console.log(response)
			if (response.status == 200) {
				setAuth(response.data.user)
				router('/slack');
			}
		} catch (error) {
			logOut();
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