import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={recievedmails:[],sentemails:[],sentobjects:[],sentkeys:[],currentmail:[],mailread:false,recievedkeys:[],allobjects:[],currentkey:null}
const mailSlice=createSlice(
    {
       name:'mails',
       initialState:initialAuthState,
       reducers:{
          recieved(state,action)
          {
           state.allobjects=action.payload;
           state.recievedmails=Object.values(action.payload);
           state.recievedkeys=Object.keys(action.payload);
           
          },
          sent(state,action)
          {
            state.sentobjects=action.payload;
            state.sentemails=Object.values(action.payload);
            state.sentkeys=Object.keys(action.payload);
          },
          currentmail(state,action)
          {
           state.currentmail=action.payload
           },
          changeRead(state)
          {
           state.mailread=true; 
          },
          currentkey(state,action)
          { 
            state.currentkey=action.payload;
          },
          removemail(state,action)
          {
            
            state.allobjects=action.payload;
         
          }
       }
    }
 )
 export default mailSlice;