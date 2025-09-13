import { createRoot } from "react-dom/client";
import App from "./AppWrapper";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <App />
) 