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
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [page, setPage] = useState('home');
  const [store, setStore] = useState(initialStore);

  return (
    <Router basename={process.env.PUBLIC_URL}>
    <div className={css.container}>
      <Header />
      <main className={css.content}>
        {renderMain()}
      </main>
      <Navbar onNavChange={setPage}/>
    </div>
    </Router>
  );


  function renderMain() {
    return (
      <Switch>
        <Route path="/profile/:userId?">
            <Profile store={store} onFollow={addFollower} onUnfollow={removeFollower}/>
        </Route>
        <Route path="/NewPost">
            <NewPost store={store} onPost={addPost}/>
        </Route>
        <Route path="/activity">
            <Activity />
        </Route>
        <Route path="/explore">
            <Explore />
        </Route>
        <Route path="/:postId?">
          <Home store={store}
                onLike={addLike}
                onUnlike={removeLike}
                onComment={addComment}/>
        </Route>
      </Switch>

    );

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
  function addFollower(userId, followerId){
        const foll = {
          userId: userId, 
          followerId: followerId
      };
      
      setStore({
        ...store,
        followers: store.followers.concat(foll)
      });
  }
  function removeFollower(userId, followerId){
    // use filter
    setStore({
      ...store,// spread props. make sure you understand this
      followers: store.followers.filter(follower=>!(follower.userId===userId && follower.followerId===followerId))
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
  }

	// TODO: Pass "store", "addPost", "cancelPost" to <NewPost/>	


}



export default App;
