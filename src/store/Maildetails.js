import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={recievedmails:[],sentemails:[]}
const mailSlice=createSlice(
    {
       name:'mails',
       initialState:initialAuthState,
       reducers:{
          recieved(state,action)
          {
           state.recievedmails=action.payload
          },
          sent(state,action)
          {
            state.sentemails=action.payload
          }
       }
    }
 )
 export default mailSlice;