import React, { createContext, useState } from "react";
const AuthorisationContext = createContext();

export default AuthorisationContext;

export function AuthorisationProvider({ children }) {
	const [isLoggedIn, setisLoggedIn] = useState(false);

	function logMeIn() {
		setisLoggedIn(true);
	}

	return (
		<AuthorisationContext.Provider value={{ isLoggedIn, logMeIn }}>
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
