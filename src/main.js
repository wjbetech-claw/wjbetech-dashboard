import { jsx as _jsx } from "react/jsx-runtime";
import "./styles/tokens.generated.css";
import "./styles/tokens.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
//# sourceMappingURL=main.js.map