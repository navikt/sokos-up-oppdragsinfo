import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page-wrapper">
      <div className="page-layout">
        <main>
          <App />
        </main>
      </div>
    </div>
  </React.StrictMode>,
);
