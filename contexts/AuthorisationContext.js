import { createContext, useState, useEffect } from "react";
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
