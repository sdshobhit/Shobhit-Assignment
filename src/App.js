import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import SignIn from './components/Signin';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import {Provider} from "react-redux"
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <Router> {/* Wrap your entire app with Router */}
      <Navbar />
      {/* Define your routes using Routes and Route */}
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Render SignIn component for the root path */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Render Dashboard component for /dashboard path */}
        <Route path="/signup" element={<SignUp />} /> {/* Render SignUp component for /signup path */}
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
