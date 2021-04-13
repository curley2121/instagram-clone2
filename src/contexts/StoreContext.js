import React, {createContext, useState, useEffect} from 'react';
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId';


// export the context so that other components can import
export const StoreContext = createContext(); 


function StoreContextProvider(props){
    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });
    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);
	return (
        <StoreContext.Provider value = {{...store, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )

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
}


export default StoreContextProvider; // export this component as default