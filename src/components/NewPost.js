import React, { useState } from 'react';
import css from './NewPost.module.css';
import FileLoader from './FileLoader.js';
import {
  useHistory
} from "react-router-dom";

function NewPost(props) {
  const history = useHistory();
  const [dragging, setDragging] = useState(false); // to show a dragging effect
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(''); // to show an error message

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
					// TODO: call setPhoto with e.target.result (this is a Base64 image string)
          setPhoto(e.target.result);
		
				};
				reader.readAsDataURL(file);
			}
    }
    setDragging(false);    
  }
  function handleDescChange(e){
		// TODO: call setDesc
    setDesc(e.target.value);
  }
  function handleSubmit(e){
		// TODO:
		// 1. Prevent default behavior
    e.preventDefault();
		// 2. Show error msg if failed and exit
    if (photo == null){
      setError("Need to add photo");

    }else if (desc == ''){
      setError("Need a description");
    } else {
      props.onPost(photo, desc);
      history.push('/');
      setError('');
    }
    
		// 3. Call the storage update function passed from the parent
    
    
		// 3. Clear error msg
  }
  function handleCancel(){
    // TODO: Notify the parent about the cancellation
    //props.onCancelPost();
    history.push('/');
  }
  return (
    <div>
        
        <div className={css.photo}>
          {!photo?  <div className={css.message}>Drop your image</div>:
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
        
        <div className={css.desc} >
					{/* TODO: add textarea */}
          <form onSubmit={handleSubmit}>
            <label>
              Description:
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} />
            </label>
          </form>
        </div>
        <div className={css.error}>
					{/* TODO: show error message */}
          {error}
        </div>
        <div className={css.actions}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Share</button>          
        </div>
    </div>
  );
}

export default NewPost;