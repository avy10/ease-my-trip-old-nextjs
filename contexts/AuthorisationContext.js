import { createContext, useState, useEffect, useContext } from "react";
const AuthorisationContext = createContext();

export default AuthorisationContext;

export function AuthorisationProvider({ children }) {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [userName, setUserName] = useState("User");
	const [userEmail, setUserEmail] = useState("No email");
	const [userUniqueInternalID, setUserUniqueInternalID] = useState("no id");

	function setUser(val) {
		setUserName(val);
	}
	function updateUser(val) {
		setUserName();
	}
	function logMeIn(nameOfUser, emailOfUser, userID, token) {
		console.log("I AM LOGGIN IN");
		setisLoggedIn(true);
		setUserName(nameOfUser);
		setUserEmail(emailOfUser);
		setUserUniqueInternalID(userID);
		token != null &&
			localStorage.setItem("userSessionToken", JSON.stringify(token));
		localStorage.setItem("userName", JSON.stringify(nameOfUser));
		localStorage.setItem("email", JSON.stringify(emailOfUser));
		localStorage.setItem("userID", JSON.stringify(userID));
	}
	function logMeOut() {
		setisLoggedIn(false);
		setUserName("User");
		setUserEmail("");
		setUserUniqueInternalID("");
		localStorage.removeItem("userSessionToken");
		localStorage.removeItem("userName");
		localStorage.removeItem("email");
		localStorage.removeItem("userID");
	}
	useEffect(() => {
		if (localStorage.getItem("userSessionToken") != null) {
			// console.log("I AM LOGGIN IN FROM LS");
			setisLoggedIn(true);
		}
		if (localStorage.getItem("userName") != null) {
			// console.log("I AM SETTING USER NAME FROM LS");
			setUserName(JSON.parse(localStorage.getItem("userName")));
		}
		if (localStorage.getItem("email") != null) {
			// console.log("I AM SETTING USER PASSWORD FROM LS");
			setUserEmail(JSON.parse(localStorage.getItem("email")));
		}
		if (localStorage.getItem("userID") != null) {
			// console.log("I AM SETTING USER ID FROM LS");
			setUserUniqueInternalID(JSON.parse(localStorage.getItem("userID")));
		}
	}, []);

	const [width, setWidth] = useState(551);
	// useEffect(() => {
	// 	setWidth(window.innerWidth);
	/* The issue arises because window is not defined on the server side. Next.js performs server-side rendering, so when the component first renders on the server, window is not available. You need to ensure that the code accessing window only runs on the client side.

To fix this, you can use a combination of useEffect and a check for typeof window !== "undefined" */
	// }, [window.innerWidth]);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setWidth(window.innerWidth);
			};

			// Set initial width
			handleResize();

			// Add event listener for resize
			window.addEventListener("resize", handleResize);

			// Cleanup event listener on component unmount
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);
	return (
		<AuthorisationContext.Provider
			value={{
				isLoggedIn,
				logMeIn,
				setUser,
				userName,
				logMeOut,
				userEmail,
				userUniqueInternalID,
				width,
			}}
		>
			{children}
		</AuthorisationContext.Provider>
	);
}

/* 
5. Remember User on Subsequent Logins: 
Implement a "Remember Me" functionality that allows users to stay logged in even after they close the browser or revisit the application. 
This feature improves user convenience.

Implement a "Remember Me" checkbox in the login form.
Store an authentication token or session identifier in a secure manner (e.g., using cookies or local storage) when the "Remember Me" option is selected.
Use this stored token to automatically log in to the user on subsequent visits without requiring them to enter credentials again.


*/
export function useAuthorisationContext() {
	return useContext(AuthorisationContext);
}
