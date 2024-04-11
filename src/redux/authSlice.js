import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};


export const RegisterUser = createAsyncThunk('RegisterUser', async (body) => {
  const res = await fetch("https://reqres.in/api/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  
  
  console.log(res); 
  
  return await res.json();
});



export const SigninUser = createAsyncThunk('SigninUser', async (body) => {
    const res = await fetch("https://reqres.in/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  });

  
  export const fetchUser = createAsyncThunk('auth/fetchUser', async (token) => {
    try {
     
  
      // Make a request to fetch user information using the token
      const res = await fetch("https://reqres.in/api/user", {
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
      });
  
      // Handle response
      if (res.ok) {
        const user = await res.json();
        return user;
      } else {
        throw new Error('Failed to fetch user information');
      }
    } catch (error) {
      // Handle errors
      throw new Error(error.message);
    }
  });
  
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   addToken:(state,action)=>{
    state.token=localStorage.getItem("token")
   },
   addUser:(state,action)=>{
    state.user=action.payload
   },
   logout:(state,action)=>{
    state.token=null;
    state.user=null;
    localStorage.clear();
   },
   addUserEmail:(state,action)=>{
    state.user = action.payload
   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninUser.pending, (state) => {
        state.loading = true;
        state.error = ""; // Clear any previous error
      })
      .addCase(SigninUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Signin successful";
        state.user = action?.meta?.arg;
        state.token = action?.payload?.token;

        // Set items in local storage
        localStorage.setItem("message", state.message);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(SigninUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = ""; // Clear any previous error
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Registration successful";
        state.user = action.payload.user;
        state.token = action.payload.token;

        // Set items in local storage
        localStorage.setItem("message", state.message);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { addUser, addToken, logout, addUserEmail } = authSlice.actions;

