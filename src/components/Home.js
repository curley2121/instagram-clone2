import React from 'react';
import Post from "./Post.js";

function Home(props) {
    const {store} = props;

  return (
		<div>
      {store.posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
      .map(post=>
			<Post
	        key={post.id}
	        user={fineUser(post, store)}
	        post={post}
	        comments={findComments(post, store)}
	        likes={findLikes(post, store)}
            onLike={props.onLike} 
            onUnlike={props.onUnlike}
            onComment={props.onComment} 
	      />)}
    </div>
	);
}

function fineUser(post, store){
    return store.users.find(user=>user.id===post.userId);
  }

function findComments(post, store){
  return store.comments.filter(comment=>comment.postId===post.id);
}

function findLikes(post, store){
  let postLikes = store.likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===store.currentUserId),
    count: postLikes.length
  }
}

export default Home;