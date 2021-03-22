import React from 'react';
import css from "./Profile.module.css";
import publicUrl from "utils/publicUrl.js";
import PostThumbnail from './PostThumbnail';

function Profile(props) {
    const {store} = props;
    var user = store.users.find(user=>user.id===store.currentUserId);
  return (
    <div className={css.profile}>
      <header className={css.header}>
      <span className={css.hh} >
      <img src={publicUrl(user.photo)} alt="User Profile" />
        {store.currentUserId} 
        </span>
        
        <p><b>{store.currentUserId} </b></p>
        
        <p>{user.bio}</p>

        
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
              <PostThumbnail post={post}/>
            </div>
          ))}

      </section>

    </div>
  );


}



export default Profile;