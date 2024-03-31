import React, { createContext, useState } from "react";
const FlightSearchContext = createContext();

export default FlightSearchContext;

export function FlightSearchProvider({ children }) {
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
	const [day, setDay] = useState("");

	function logMeIn() {
		setisLoggedIn(true);
	}

	return (
		<FlightSearchContext.Provider value={{ isLoggedIn, logMeIn }}>
			{children}
		</FlightSearchContext.Provider>
	);
}
