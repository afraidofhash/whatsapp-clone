import React from 'react';
import './Login.css'
import Button from '@mui/material/Button';
import { auth } from './firebase';
import { provider } from './firebase';
import {useStateValue} from './StateProvider'
import { actionTypes } from './reducer';

function Login() {
    const [{user},dispatch]=useStateValue()

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
                
            })
        })
        .catch((error)=>alert(error.message))
    }
  return (
  <div className='login'>
    <div className='login__container'>
        <img src="https://static.facebook.com/images/whatsapp/www/whatsapp-promo.png" alt="login"/>
        <div className='login__text'>
            <h1>Login to Abhi Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>Sign in with Google</Button>
    </div>
  </div>
  )
}

export default Login;
