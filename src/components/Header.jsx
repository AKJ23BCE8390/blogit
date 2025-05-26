import React, { useEffect, useState } from "react";
import logo from "/images/icon.png";
import '../styles/Header.css'; 

import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from "../firebaseconfig.js"; 

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("User signed in:", result.user);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="header">
            <div className="left-section">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="header-title">Blogit!</h1>
            </div>

            {user ? (
                <div className="user-section">
                    <span className="user-name">Hi, {user.displayName || "User"}</span>
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="user-avatar" />
                    ) : (
                        <div className="user-avatar user-placeholder">
                            {user.displayName ? user.displayName.charAt(0) : "U"}
                        </div>
                    )}
                    <button className="login-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <button className="login-button" onClick={handleLogin}>
                    <span className="login-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
                        </svg>
                    </span>
                    <span className="login-text">Login</span>
                </button>
            )}
        </header>
    );
}

export default Header;
