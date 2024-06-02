import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/react";

import App from "./App";
import "./index.css";
import store from "./redux/store";

// Create the root container
const container = document.getElementById("root");
const root = createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <SpeedInsights />
        <Analytics />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
