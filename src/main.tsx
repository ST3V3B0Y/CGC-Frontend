import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";
// import { LibraryProvider } from "./context/libraryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <LibraryProvider> */}
        <App />
      {/* </LibraryProvider> */}
    </AuthProvider>
  </React.StrictMode>
);
