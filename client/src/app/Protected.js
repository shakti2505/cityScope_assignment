import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Login from './authentication/Login';


const Protected = (props) => {
const {Component} = props;
const [isProtected, setIsProtected] = useState(false)
useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('User'));
    if(user){
        setIsProtected(true)
    }
},[])

  return (
    isProtected ? <Component/> : <Login/>
        
  )
}

export default Protected;