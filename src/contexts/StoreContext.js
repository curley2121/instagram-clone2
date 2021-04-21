import React, {createContext, useState, useEffect} from 'react';
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';
import { useHistory } from "react-router-dom";

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

// export the context so that other components can import
export const StoreContext = createContext(); 

var firebaseConfig = {
  apiKey: "AIzaSyDGfccuYXPOJX3iqECS_ox2LDt9w8TrwGQ",
  authDomain: "instagram-clone-8524e.firebaseapp.com",
  projectId: "instagram-clone-8524e",
  storageBucket: "instagram-clone-8524e.appspot.com",
  messagingSenderId: "1042016093889",
  appId: "1:1042016093889:web:053bb99d9b88bded213640"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function StoreContextProvider(props){
  
  const history = useHistory();

  const [currentUserId, setCurrentUserId] = useState(null); // or 'judy'
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(()=>{// initialization
    db.collection('users').get().then(snapshot=>{
      const users = snapshot.docs.map(d=>d.data());
      setUsers(users);
    });
    db.collection('posts').get().then(snapshot=>{
      const posts = snapshot.docs.map(d=>d.data());
      setPosts(posts);
    });
    db.collection('likes').get().then(snapshot=>{
      const likes = snapshot.docs.map(d=>d.data());
      setLikes(likes);
    });
    db.collection('followers').get().then(snapshot=>{
      const followers = snapshot.docs.map(d=>d.data());
      setFollowers(followers);
    });
    db.collection('comments').get().then(snapshot=>{
      const comments = snapshot.docs.map(d=>d.data());
      setComments(comments);
    });
    

  }, []); // second argument to [] to be called only once


    
  console.log(users);
    console.log(posts);


	return (
    
        <StoreContext.Provider value = {{posts, users, likes, followers, comments, login, signup, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )

    function addLike(postId){
        const like = {
            userId: currentUserId, 
            postId,
            datetime: new Date().toISOString()
        };
        
        setLikes(likes.concat(like));
        // Firestore update
        db.collection('likes').add(like);

        
      }
      
      function removeLike(postId){
        
      setLikes(likes.filter(like=>!(like.userId===currentUserId && like.postId===postId)));
      db.collection('likes')
      .where('userId', '==', currentUserId)
      .where('postId', '==', postId)
      .get()
      .then(snapshot=>snapshot.forEach(doc=>doc.ref.delete()));
          
      }
      function addFollower(userId, followerId){
            const foll = {
              userId: userId, 
              followerId: followerId
          };
          setFollowers(followers.concat(foll));
          db.collection('followers').add(foll);

      }
      function removeFollower(userId, followerId){
        // use filter
        setFollowers(followers.filter(follower=>!(follower.userId===userId && follower.followerId===followerId)))
        
        db.collection('followers')
        .where('followerId', '==', followerId)
        .where('userId', '==', userId)
        .get()
        .then(snapshot=>snapshot.forEach(doc=>doc.ref.delete()));
          
      }

      
    
      function addComment(postId, text){
        const comment = {
          userId: currentUserId, 
          postId,
          text,
          datetime: new Date().toISOString()
        };
        setComments(comments.concat(comment)) ;
        db.collection('comments').add(comment);

      }
    
    
      function addPost(photo, desc){
            // TODO:
            // 1. Create a new post object (use uniqueId('post') to create an id)
        const newPost = {
          id: uniqueId('post'),
          userId: currentUserId,
          photo:photo,
          desc:desc,
          datetime: new Date().toISOString(),
        }

        setPosts(posts.concat(newPost));
        db.collection('posts').add(newPost);

            // 3. Call setPage to come back to the home page
      }

      function login(email, password){
        auth.signInWithEmailAndPassword(email,password).then((response)=>{
          // success
          db.collection('users')
            .where('email','==', response.user.email)
            .get()
            .then(snapshot=>{
            setCurrentUserId(snapshot.docs[0].data().id); //first document's data = user info
          })
          history.push('/');


        }).catch(error=>{
          // fail
          setCurrentUserId(null);
        });
      }

      function signup(email, password, bio, id, name, photo){
        const user = {
          email, id, name, bio, photo
        };
        auth.createUserWithEmailAndPassword(email, password).then(()=>{
          // add a user to the firestore database
          db.collection('users').add(user);
          // add a user to the app state
          setUsers(users.concat(user));
          // set the user as a current user 
          setCurrentUserId(id);
          // route to home
          history.push('/');
        })
      }



}


export default StoreContextProvider; // export this component as default