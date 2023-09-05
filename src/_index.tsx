import { StrictMode } from "react";
//import { createRoot } from "./react-dom/client";
import { createRoot } from "react-dom/client";

import App from "./pages/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
