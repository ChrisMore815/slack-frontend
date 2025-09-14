import { createRoot } from "react-dom/client";
import App from "./AppWrapper";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import Loading from "./components/Loading";
// import ThemeProvider from "./contexts/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    {/* <ThemeProvider> */}
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <App />
      </Suspense>
    {/* </ThemeProvider> */}
  </ChakraProvider>
) 