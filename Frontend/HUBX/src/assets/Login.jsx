import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom";
import axios from 'axios';


export const Login = () => {
  const template = { username: "", password: "" }

  const [formvalues, SetFormvalues] = useState(template);
  const [error, Seterror] = useState("");
  const [Spanerror, SetSpanerror] = useState("");
  const [SubmitState, SetSubmitState] = useState(false);


  async function submitform() {

    var obj;

    const result = await axios.post('http://localhost:4000/user/verify-signin', { username: formvalues.username , password:formvalues.password })
      .then((res) => { obj = res.data }).catch((error) => { console.log(error) });

    if (obj.status === "OK") {
      location.reload();
    }else{
      SetSpanerror(obj.data);
    }

  }


  const handlechange = (e) => {
    const { name, value } = e.target;
    SetFormvalues({ ...formvalues, [name]: value })
  }

  const handlesubmit = (e) => {

    e.preventDefault();
    validate(formvalues);

  }

  const validate = (vals) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!vals.username) {
      SetSpanerror("Username Required");
    } else if (!vals.password) {
      SetSpanerror("Password Required");
    } else {
      SetSpanerror("");
      SetSubmitState(true);
      submitform();
    }
  }

  return (
    <div className='login-div'>

      <form className='login-card' onSubmit={handlesubmit}>
        <h1>Login</h1>
        <div>
          <span>Username</span>
          <input type="text" name='username' value={formvalues.username} onChange={handlechange} />
        </div>
        <div>
          <span>Password</span>
          <input type="password" name='password' value={formvalues.password} onChange={handlechange} />
        </div>
        <div>
          <span className='invalid'>{Spanerror}</span>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}
