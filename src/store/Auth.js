import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={isloggedin:false,tokenid:null,email:null}
const authSlice=createSlice(
    {
       name:'auth',
       initialState:initialAuthState,
       reducers:{
          login(state,action)
          {
           state.isloggedin=true;
           state.tokenid=action.payload.idToken;
           state.email=action.payload.email; 
          },
          logout(state)
          {
            state.isloggedin=false;
            state.tokenid=null
          }
       }
    }
 )
 export default authSlice;