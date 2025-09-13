import { createRoot } from "react-dom/client";
import App from "./AppWrapper";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ToastContainer />
    <App />
  </ChakraProvider>
) 