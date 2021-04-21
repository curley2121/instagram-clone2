import React, {useState, useContext} from 'react';
import css from './Login.module.css';
import {
    useHistory
  } from "react-router-dom";
import {StoreContext} from 'contexts/StoreContext';
function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useContext(StoreContext);
    function handleEmail(e){
     setEmail(e.target.value);   
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(email==='', password === '');
        if (email==='' || password === ''){
            setError('Either email or password is missing...');
            return;
        }
        login(email, password);
        setEmail('');
        setPassword('');
        setError('');

    }
    function handleSignup(){
        history.push('/signup');
    }
    return (
        <div className= {css.container}>
            <h3 className={css.header}>Login</h3>
            <form className= {css.loginForm} onSubmit={handleSubmit}>
                <label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </label>
                
                <div className={css.error}>
                    {error}
                </div>
                <button className={css.loginBtn} type="submit">Log In</button>
            </form>
            <div className={css.signup}>
                Didn't have an account? &nbsp;
                <button className={css.signupBtn} onClick={handleSignup}>Sign Up</button>
            </div>
            
        </div>
    );
}

export default Login;
