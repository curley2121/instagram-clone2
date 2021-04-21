
import Post from "./Post.js";
import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from 'contexts/StoreContext';


function Home(props) {
  let {postId} = useParams();


    let {
      posts, users, comments, likes, currentUserId, 
      addComment, addLike, removeLike
    } = useContext(StoreContext);

    


    
  if (postId == null){
    return (
      <div>
        {posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
        .map(post=>
        <Post
            key={post.id}
            user={fineUser(post, users)}
            post={post}
            comments={findComments(post, comments)}
            likes={findLikes(post, likes)}
              onLike={addLike} 
              onUnlike={removeLike}
              onComment={addComment} 
          />)}
      </div>
    );

    }else
    {
    return(
      <div>
      {posts.filter(post=>post.id===postId)
      .map(post=>
			<Post
	        key={post.id}
	        user={fineUser(post, users)}
	        post={post}
	        comments={findComments(post, comments)}
	        likes={findLikes(post, likes)}
            onLike={addLike} 
            onUnlike={removeLike}
            onComment={addComment} 
	      />)}
    </div>
    )

  }

  function fineUser(post, users){
    return users.find(user=>user.id===post.userId);
  }
  
  function findComments(post, comments){
  return comments.filter(comment=>comment.postId===post.id);
  }
  
  function findLikes(post, likes){
  let postLikes = likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===currentUserId),
    count: postLikes.length
  }
  }

}





export default Home;