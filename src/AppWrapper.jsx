import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import App from "./App";

const AppWrapper = () => {
    return <Router>
        <App />
    </Router>
}

export default AppWrapper;