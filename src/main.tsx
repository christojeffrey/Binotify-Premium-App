import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ScreensRouter from "./router";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ScreensRouter />
  </React.StrictMode>
);
