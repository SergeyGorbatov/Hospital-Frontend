import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Store } from "src/store/store";
import App from "src/App";
import "./index.css";

const store = new Store();
export const Context = createContext(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={store}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
