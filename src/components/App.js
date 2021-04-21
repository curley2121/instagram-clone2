import React, { useState } from 'react';
// import logo from './logo.svg';
import StoreContextProvider from 'contexts/StoreContext';
import "./App.css";
import css from "./App.module.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Explore from "./Explore.js";
import NewPost from "./NewPost.js";
import Activity from "./Activity.js";
import Profile from "./Profile.js";
import Navbar from "./Navbar.js";
import Login from "./Login";
import Signup from "./Signup";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [page, setPage] = useState('home');
  

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StoreContextProvider>
    <div className={css.container}>
      <Header />
      <main className={css.content}>
        {renderMain()}
      </main>
      <Navbar onNavChange={setPage}/>
    </div>
    </StoreContextProvider>
    </Router>
  );


  function renderMain() {
    return (
      <Switch>
        <Route path="/profile/:userId?">
            <Profile />
        </Route>
        <Route path="/NewPost">
            <NewPost />
        </Route>
        <Route path="/activity">
            <Activity />
        </Route>
        <Route path="/explore">
            <Explore />
        </Route>
        <Route path="/:postId?">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>

    );

  }



	// TODO: Pass "store", "addPost", "cancelPost" to <NewPost/>	


}



export default App;
