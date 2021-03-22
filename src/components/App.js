import React, { useState } from 'react';
// import logo from './logo.svg';
import "./App.css";
import css from "./App.module.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Explore from "./Explore.js";
import NewPost from "./NewPost.js";
import Activity from "./Activity.js";
import Profile from "./Profile.js";
import Navbar from "./Navbar.js";
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';

function App() {
  const [page, setPage] = useState('home');
  const [store, setStore] = useState(initialStore);

  return (
    <div className={css.container}>
      <Header />
      <main className={css.content}>
        {renderMain()}
      </main>
      <Navbar onNavChange={setPage}/>
    </div>
  );


  function renderMain() {
    switch (page) {
      case "home":
        return <Home
        store={store}
        onLike={addLike}
        onUnlike={removeLike}
        onComment={addComment} 
      />;
      case "explore":
        return <Explore />;
      case "activity":
        return <Activity />;
      case "newpost":
        return <NewPost store={store} onPost={addPost} onCancelPost={cancelPost}/>;
      case "profile":
        return <Profile store={store}/>;
      default:
        return <Home />;
    }
  }

  function addLike(postId){
    const like = {
        userId: store.currentUserId, 
        postId,
        datetime: new Date().toISOString()
    };
    
    setStore({
      ...store,
      likes: store.likes.concat(like)
    });
  }
  
  function removeLike(postId){
    
      setStore({
        ...store,// spread props. make sure you understand this
        likes: store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId))
      });
  }

  function addComment(postId, text){
    const comment = {
      userId: store.currentUserId, 
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
        comments:store.comments.concat(comment)
    });
  }


  function addPost(photo, desc){
		// TODO:
		// 1. Create a new post object (use uniqueId('post') to create an id)
    const newPost = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo:photo,
      desc:desc,
      datetime: new Date().toISOString(),
    }
		setStore({
      ...store,
        posts: store.posts.concat(newPost)
    });
		// 3. Call setPage to come back to the home page
    setPage("home");
  }
	function cancelPost(){
		// TODO:
		// 1. Call setPage to come back to the home page (we will use Router to improve this)
    setPage("home");
	}
	// TODO: Pass "store", "addPost", "cancelPost" to <NewPost/>	


}



export default App;
