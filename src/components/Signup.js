import React, {useState, useContext} from 'react';
import css from './Signup.module.css';
import {
    useHistory
  } from "react-router-dom";
import FileLoader from './FileLoader.js';
import {StoreContext} from 'contexts/StoreContext';
function Signup(props) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');
    const [dragging, setDragging] = useState(false); // to show a dragging effect
    const {signup} = useContext(StoreContext);
    function handleId(e){
        setId(e.target.value);   
    }
    function handleEmail(e){
        setEmail(e.target.value);   
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleBio(e){
        setBio(e.target.value);
    }
    function handleName(e){
        setName(e.target.value);
    }
    function handleFileDragEnter(e){
        setDragging(true);
    }
    function handleFileDragLeave(e){
        setDragging(false);
    }
    function handleFileDrop(e){
        if (e.dataTransfer.types.includes('Files')===false){
                return;
        }
        if (e.dataTransfer.files.length>=1){
          let file = e.dataTransfer.files[0];
          if (file.size>1000000){// larger than 1 MB
            return;
          }
          if (file.type.match(/image.*/)){
                let reader = new FileReader();			
                reader.onloadend = (e) => {
                    setPhoto(e.target.result);
            
                };
                reader.readAsDataURL(file);
            }
        }
        setDragging(false);
    }
    function handleSubmit(e){
        e.preventDefault();
        if (email==='' || password === ''){
            setError('Id and password is missing...');
            return;
        }
        
        signup(email, password, bio, id, name, photo);
        setEmail('');
        setPassword('');
        setBio('');
        setId('');
        setName('');
        setPhoto('');
        setError('');

    }
    function handleLogin(){
        history.push('/login');
    }
    return (
        <div className= {css.container}>
            <h3 className={css.header}>Signup</h3>
            <div className={css.photo}>
            {!photo?  <div className={css.message}>Drop your photo</div>:
                        <img src={photo} alt="New Post"/>}
                <FileLoader
                onDragEnter={handleFileDragEnter}
                onDragLeave={handleFileDragLeave}
                onDrop={handleFileDrop}
                >
                <div className={[css.dropArea, dragging?css.dragging:null].join(' ')}
                ></div>
            </FileLoader>
            
            </div>
            <form className= {css.signupForm} onSubmit={handleSubmit}>
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
                <label>
                    <input
                        type="id"
                        name="id"
                        placeholder="id"
                        value={id}
                        onChange={handleId}
                    />
                </label>
                <label>
                    <input
                        type="name"
                        name="name"
                        placeholder="name"
                        value={name}
                        onChange={handleName}
                    />
                </label>
                <label>
                    <textarea
                        type="bio"
                        name="bio"
                        placeholder="bio"
                        row="2"
                        value={bio}
                        onChange={handleBio}
                    />
                </label>
                <div className={css.error}>
                    {error}
                </div>
                <button className={css.signupBtn} type="submit">Sign Up</button>
            </form>
            <div className={css.login}>
                Already have an account?
                &nbsp;
                <button className={css.loginBtn} onClick={handleLogin}>Log In</button>
            </div>
            
        </div>
    );
}

export default Signup;
