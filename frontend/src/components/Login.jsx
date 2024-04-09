import React,{useState} from 'react';
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
export default function Login() {
    const [cred,setCred]=useState({email:"",password:""});
    const navigate = useNavigate();
    const cookies = new Cookies();
    const host="https://tj-notebook.vercel.app";
    if(cookies.get('auth-token')){
        navigate("/");
    }
    const handleSubmit=async (e)=>{
         e.preventDefault();
         const response=await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(cred)
          });
          const data=await response.json();
          document.getElementById("error").innerHTML=data.error;
          if(data.success){
            // cookies.set('auth-token',data.authtoken);
            cookies.set('auth-token', data.authtoken, {path: '/', expires: new Date(Date.now()+2592000)});
            navigate("/");
          }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
      }
  return (
    
    <div className="container my-5 w-100 d-flex flex-column justify-content-center">
      <h1>Login To TJ Notebook</h1>
        <form onSubmit={handleSubmit} method="post">
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" onChange={onChange} value={cred.email} className="form-control"  id="email" name="email" aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} value={cred.password}  className="form-control" name="password" id="password" required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <div id="error"></div>
</form>
    </div>
  )
}
