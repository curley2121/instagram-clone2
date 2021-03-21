import React from 'react';
import css from './Navbar.module.css';
import publicUrl from 'utils/publicUrl';

function Navbar(props) {
    function handleNavChange(page){
      console.log('page', page);
        if (props.onNavChange){
            props.onNavChange(page);
        }
    }
    return (
        <nav className={css.navbar}>
            <div className={css.navItem}>
                <button onClick={e=>handleNavChange("home")}>
                <img src={publicUrl('/assets/home.svg')} alt="Home"/>
                </button>
            </div>
            <div className={css.navItem}>
                <button onClick={e=>handleNavChange("explore")}>
                <img src={publicUrl('/assets/explore.svg')} alt="Explore"/>
                </button>
            </div>
						            <div className={css.navItem}>
                <button onClick={e=>handleNavChange("newpost")}>
                <img src={publicUrl('/assets/newpost.svg')} alt="New Post"/>
                </button>
            </div>
            <div className={css.navItem}>
                <button onClick={e=>handleNavChange("activity")}>
                <img src={publicUrl('/assets/activity.svg')} alt="Activity"/>
                </button>
            </div>
            <div className={css.navItem}>
                <button onClick={e=>handleNavChange("profile")}>
                    <img src={publicUrl('/assets/profile.svg')} alt="profile"/>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;