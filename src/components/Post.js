import React, { useState } from 'react';
import { useContext } from 'react';
import css from "./Post.module.css";
import timespan from "utils/timespan.js";
import publicUrl from "utils/publicUrl.js";
import { StoreContext } from 'contexts/StoreContext';
import {
  Link
} from "react-router-dom";

function Post(props) {
    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false); // hidden initially
    let {
      posts, users, followers, currentUserId, 
      addFollower, removeFollower
    } = useContext(StoreContext);
  return (
    <article className={css.post}>
      <header className={css.header}>
      <Link key={props.user.id} to={`/profile/${props.user.id}`}>
        <button className={css.user} to={`/profile/${props.user.id}`}>
          <img src={publicUrl(props.user.photo)} alt="User Profile" />
          <span>{props.user.id} </span>
        </button>
        </Link>
      </header>
      <section className={css.content}>
        <div className={css.imgContainer}>
          <img src={publicUrl(props.post.photo)} alt="Post" />
        </div>
      </section>

      <section className={css.actions}>
        <button>
          {props.likes.self ? (
            <img
              src={publicUrl('/assets/unlike.svg')}
              alt="Unlike Action"
              onClick={handleUnlike}
            />
          ) : (
            <img
              src={publicUrl('/assets/like.svg')}
              alt="Like Action"
              onClick={handleLike}
            />
          )}
        </button>
        <button onClick={e=>setToggleComment(!toggleComment)}>
          <img
            src={publicUrl('/assets/comment.svg')}
            alt="Comment Action"
          />
        </button>
      </section>
      <section className={css.activity}>
        <div className={css.likes}>{props.likes.count} likes</div>
        <div className={css.comments}>
          <div>
            <span>
              {props.post.userId}
            </span>
            <span>{props.post.desc}</span>
          </div>
          {props.comments.map((comment, i) => (
            <div key={i}>
              <Link key={comment.userId} to={`/profile/${comment.userId}`}>
              <span>
                {comment.userId}
              </span>
              </Link>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
        <time className={css.time}>
          {timespan(props.post.datetime).toUpperCase()} AGO
        </time>
      </section>
      {toggleComment && 
      <form className={css.addComment} onSubmit={handleSubmitComment}>
        <input type="text" placeholder="Add a comment…" value={comment} onChange={e=>setComment(e.target.value)}/>
        <button type="submit">Post</button>
      </form>
    }
    </article>
  );
    function handleLike(){ 
        props.onLike(props.post.id);
    }
    function handleUnlike(){
        props.onUnlike(props.post.id);
    }

    function handleSubmitComment(event){
        props.onComment(props.post.id, comment); // this calls addComment from App.js
        setComment(''); //reset
        setToggleComment(false); //close comment box
        event.preventDefault(); // prevent page refresh
      }


}


export default Post;