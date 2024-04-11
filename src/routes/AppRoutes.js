import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "../components/Signin";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
