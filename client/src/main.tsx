import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
