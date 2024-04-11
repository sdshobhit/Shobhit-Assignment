import { createContext, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/authSlice";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user = {} } = useSelector((state) => state.user);
  const isUser = Object.keys(user || {})?.length;
  const localUser = localStorage.getItem("user");
  const localUserObj = JSON.parse(localUser || "{}") || {};
  const isLocalUser = Object.keys(localUserObj || {})?.length;

  useLayoutEffect(() => {
    setIsLoading(true);
    if (!isUser && isLocalUser) {
      dispatch(addUser(localUserObj));
      setIsLoggedIn(true);
    } else if (isUser || isLocalUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [localUser, user]);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
