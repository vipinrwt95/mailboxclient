import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { mailActions } from "../store";
const useHttp=(applydata)=>{
   
const sendRequest=async(requestconfig)=>{
   const response = await fetch(requestconfig.url,{
       method:requestconfig.method ? requestconfig.method:'GET',
       headers:requestconfig.headers ? requestconfig.headers:{},
       body:requestconfig.body ? JSON.stringify(requestconfig.body):null,
    })
    const data=await response.json();
   if(response.ok)
   { 
    applydata(data);
   }
   else{
    applydata(data.error.message);
   }
}
   

return {
    sendRequest,
}

};

export default useHttp;