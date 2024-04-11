import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const SignUpHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(RegisterUser({ email, password }));
      console.log(response)
      if (response.payload.token) {
        setSuccessMessage("Sign up successful!"); // Display success message
        setEmail(""); 
        setPassword(""); 
        history("/")
      } else {
        setError(response.payload.error); // Display error message
        setEmail(""); 
        setPassword(""); 
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later."); // Display error message
      console.error('Signup error:', error);
    }
  }

  return (
    <div className="flex justify-center bg-slate-600 items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={SignUpHandle}>
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

          <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />

          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 cursor-pointer">
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.6 21.21a2 2 0 01-2.79-.09l-1.42-1.42a2 2 0 01-.09-2.79l6.18-6.18a2 2 0 012.88 2.88l-6.18 6.18zM15 12a12.04 12.04 0 00-9 4.5 12.04 12.04 0 009 9 12.04 12.04 0 009-9 12.04 12.04 0 00-9-4.5zM19 7.05l-1.41 1.41"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a12.04 12.04 0 00-9 4.5 12.04 12.04 0 009 9 12.04 12.04 0 009-9 12.04 12.04 0 00-9-4.5zM19 7.05l-1.41 1.41"></path>
                </svg>
              )}
            </span>
          </div>
                
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
