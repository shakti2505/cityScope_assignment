let BASE_URL_API
if(
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === ""
     
){
    BASE_URL_API = "http://localhost:4800";
}else{
    BASE_URL_API="https://scholerhub.onrender.com/"
}
  
export default BASE_URL_API