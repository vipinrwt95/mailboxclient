import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Auth';
import mailSlice from './Maildetails';

const store=configureStore({
  reducer:{auth:authSlice.reducer,mails:mailSlice.reducer}
});

export const authActions=authSlice.actions;
export const mailActions=mailSlice.actions;
export default store;