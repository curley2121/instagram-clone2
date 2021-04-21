import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';
import css from "./Profile.module.css";
import publicUrl from "utils/publicUrl.js";
import PostThumbnail from './PostThumbnail';
import {
  Link
} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";

function Profile(props) {
  let {userId} = useParams();
  let {
    posts, users, followers, currentUserId, 
    addFollower, removeFollower
  } = useContext(StoreContext);
    
    var user = users.find(user=>user.id===userId);
    if (userId == null){
      user = users.find(user=>user.id===currentUserId);
    }

    let followes = followers.filter(follower=>follower.userId===user.id );
    let self = followes.some(follower=> follower.followerId===currentUserId)


    


    
  return (
    !user?<Redirect to="login"/>: 
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
                <b> {posts.filter(post=>post.userId===user.id).length}</b>
                <p>Posts</p>
                </button>
            </div>
            <div className={css.fItem}>
                <button >
                <b> {followers.filter(follower=>follower.userId===user.id).length}</b>
                <p>Followers</p>
                </button>
            </div>
            <div className={css.fItem}>
                <button >
                <b> {followers.filter(follower=>follower.followerId===user.id).length}</b>
                <p>Followers</p>
                </button>
            </div>

      </section>
      <section className={css.posts}>
            {posts.filter(post=>post.userId===user.id).map((post, i) => (
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
    addFollower(user.id, currentUserId);
}
function handleUnfollow(){
  removeFollower(user.id, currentUserId);
}

function renderFollowButt(){
  if (user.id !== currentUserId){
  return self ? (
    <button className={css.unfollowBut} onClick={handleUnfollow}>Unfollow</button>
    ) : (
      <button className={css.followBut} onClick={handleFollow}>Follow</button>
    )
  }
}


}



export default Profile;