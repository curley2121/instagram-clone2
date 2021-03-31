import React from 'react';
import css from "./Profile.module.css";
import publicUrl from "utils/publicUrl.js";
import PostThumbnail from './PostThumbnail';
import {
  Link
} from "react-router-dom";
import { useParams } from 'react-router-dom';

function Profile(props) {
  let {userId} = useParams();
    const {store} = props;
    var user = store.users.find(user=>user.id===userId);
    if (userId == null){
      user = store.users.find(user=>user.id===store.currentUserId);
    }

    let followers = store.followers.filter(follower=>follower.userId===user.id );
    let self = followers.some(follower=> follower.followerId===store.currentUserId)


    
  return (
    <div className={css.profile}>
      <header className={css.header}>
      <span className={css.hh} >
      <img src={publicUrl(user.photo)} alt="User Profile" />
        {user.id} 
        </span>
        
        <p><b>{user.id} </b></p>
        
        <p>{user.bio}</p>
  
        {renderFollowButt()}


        
      </header>
      <section className={css.followers}>
            <div className={css.fItem}>
                <button >
                <b> {store.posts.filter(post=>post.userId===user.id).length}</b>
                <p>Posts</p>
                </button>
            </div>
            <div className={css.fItem}>
                <button >
                <b> {store.followers.filter(follower=>follower.userId===user.id).length}</b>
                <p>Followers</p>
                </button>
            </div>
            <div className={css.fItem}>
                <button >
                <b> {store.followers.filter(follower=>follower.followerId===user.id).length}</b>
                <p>Followers</p>
                </button>
            </div>

      </section>
      <section className={css.posts}>
            {store.posts.filter(post=>post.userId===user.id).map((post, i) => (
            <div className={css.po} key={i}>
              <Link key={post.id} to={"/" + post.id.toString()}>
              <PostThumbnail post={post}/>
              </Link>
            </div>
          ))}

      </section>

    </div>
  );

  function handleFollow(){ 
    props.onFollow(user.id, store.currentUserId);
}
function handleUnfollow(){
  props.onUnfollow(user.id, store.currentUserId);
}

function renderFollowButt(){
  if (user.id !== store.currentUserId){
  return self ? (
    <button className={css.unfollowBut} onClick={handleUnfollow}>Unfollow</button>
    ) : (
      <button className={css.followBut} onClick={handleFollow}>Follow</button>
    )
  }
}


}



export default Profile;