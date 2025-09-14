import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from "@chakra-ui/react";
import QueryProvider from './contexts/QueryProvider'
// import ThemeProvider from "./contexts/ThemeProvider";
import Loading from "./components/Loading";
import App from "./AppWrapper";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <QueryProvider>
      {/* <ThemeProvider> */}
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <App />
      </Suspense>
      {/* </ThemeProvider> */}
    </QueryProvider>
  </ChakraProvider>
) 