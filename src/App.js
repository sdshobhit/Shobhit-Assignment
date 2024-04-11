import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import store from "./redux/store";
import AuthProvider from "./contexts/Auth/AuthProvider";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <AppRoutes />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
