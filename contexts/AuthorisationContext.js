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
