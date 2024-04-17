import React, { createContext, useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { domain, allTheAirports } from "@/public/utils/apiFetch";

// constant/default values for source and destination
const SOURCE_DEFAULT = {
	coordinates: {
		latitude: 28.5562,
		longitude: 77.1,
	},
	additional_info: {
		timezone: "IST",
		elevation: 237,
	},
	_id: "6514309e348f6fafa1b86607",
	name: "Indira Gandhi International Airport",
	city: "Delhi",
	country: "India",
	iata_code: "DEL",
	icao_code: "VIDP",
	__v: 0,
};

const DESTINATION_DEFAULT = {
	coordinates: {
		latitude: 19.0896,
		longitude: 72.8656,
	},
	additional_info: {
		timezone: "IST",
		elevation: 14,
	},
	_id: "6514309e348f6fafa1b86608",
	name: "Chhatrapati Shivaji Maharaj International Airport",
	city: "Mumbai",
	country: "India",
	iata_code: "BOM",
	icao_code: "VABB",
	__v: 0,
};

const FlightSearchContext = createContext();
export default FlightSearchContext;
export function FlightSearchProvider({ children }) {
	// states to facilitate search functionality => Search - states
	const [source, setSource] = useState(SOURCE_DEFAULT);
	const [destination, setDestination] = useState(DESTINATION_DEFAULT);
	dayjs.locale("en-in");
	const [today] = useState(dayjs());
	const [day, setDay] = useState(dayjs());
	const [returnDay, setReturnDay] = useState(dayjs());
	const [numberOfPassengers, setNumberOfPassengers] = useState(1);
	const [isTwoWay, setIsTwoWay] = useState(false);
	const [airportNames, setAirportNames] = useState([]);

	function resetDefaults() {
		// when I navigate from a search page which had error due to wrong data, I would redirect to flights-home page
		// in that scenario it is best to reset the states present in this context to their default values
		// or should I just leave it, and when the flights-home renders, it will make the box red-colored depending on where the error was
	}

	useEffect(() => {
		console.log("STUDYING DAYJS", dayjs().$D);
	}, []);

	// function working on search-states
	function updateFlightSearchStates(text, val) {
		console.log(text, val);
		if (text == "source" || text == "FROM") {
			setSource(val);
		} else if (text == "destination" || text == "TO") {
			setDestination(val);
		} else if (text == "day") {
			setDay(val);
		} else if (text == "numberOfPassengers") {
			setNumberOfPassengers(val);
		} else {
			return;
		}
	}
	function updateTwoWay(val) {
		setIsTwoWay(val);
	}
	function updateDay(text, val) {
		// console.log("DATE VALUE", val);
		if (text == "day") {
			setDay(val);
			setReturnDay(val);
		} else if (text == "returnDay") {
			setReturnDay(val);
		} else {
			return;
		}
	}

	// refs to facilitate autofocus when the search button performs a validation check and gets error
	const sourceInputRef = useRef();
	const destinationInputRef = useRef();
	const dayInputRef = useRef();
	const returnDayInputRef = useRef();
	const noOfTravellersInputRef = useRef();
	const searchButtonRef = useRef();

	// state which tracks errors in form. Earlier there was only one single state in the AirportSearchBox component, but now that i need to perform validation, it is best to maintain individual state for each field
	const [sourceError, setSourceError] = useState(false);
	const [destinationError, setDestinationError] = useState(false);
	const [dayError, setDayError] = useState(false);
	const [returnDayError, setReturnDayError] = useState(false);

	function updateErrorState(key, val) {
		if (key == "srcErr") {
			setSourceError(val);
		} else if (key == "destErr") {
			setDestinationError(val);
		} else if (key == "dayErr") {
			setDayError(val);
		} else if (key == "returnDayErr") {
			setReturnDayError(val);
		}
	}

	useEffect(() => {
		console.log("TODAY", today);
		console.log("day", day);
		console.log("return day", returnDay);
		// const todayString = `${today?.$D}/`;
		// console.log(todayString);
		const todayString = dayjs(today).format("DD/MM/YYYY");
		const dayString = dayjs(day).format("DD/MM/YYYY");
		const returnDayString = dayjs(returnDay).format("DD/MM/YYYY");
		// console.log(dayjs(today).format("DD/MM/YYYY"));
		dayString < todayString && setDayError(true);
		returnDayString < todayString && setReturnDayError(true);

		const maxFlightBookingWindow = today.add(8, "months");
		const maxFlightBookingWindowString = dayjs(
			maxFlightBookingWindow
		).format("DD/MM/YYYY");
		if (
			dayString > maxFlightBookingWindowString ||
			returnDayString > maxFlightBookingWindowString
		) {
			setDayError(true);
			setReturnDayError(true);
		}
		if (dayString >= today && dayString > maxFlightBookingWindowString) {
			setDayError(false);
		}
		if (
			returnDayString >= today &&
			returnDayString > maxFlightBookingWindowString
		) {
			setReturnDayError(false);
		}
		/* day < today && setDayError(true);
		returnDay < today && setReturnDayError(true);
		if (
			day > today.add(8, "months") ||
			returnDay > today.add(8, "months")
		) {
			setDayError(true);
			setReturnDayError(true);
		}
		if (day >= today && day > today.add(8, "months")) {
			setDayError(false);
		}
		if (returnDay >= today && returnDay > today.add(8, "months")) {
			setReturnDayError(false);
		} */
	}, [day, returnDay]);

	// fetching names of the airport from the API
	useEffect(() => {
		// sourceInputRef?.current?.children[1].children[0].focus();
		fetch(`${domain}${allTheAirports}`, {
			method: "GET",
			headers: {
				projectID: "4xh7gn2pv8it",
			},
		})
			.then((res) => res.json())
			.then((apiData) => {
				setAirportNames(apiData?.data?.airports);
				// updateFlightSearchStates("source", apiData?.data?.airports[7]);
				// updateFlightSearchStates(
				// 	"destination",
				// 	apiData?.data?.airports[8]
				// );
			});
	}, []);

	useEffect(() => {
		sourceInputRef?.current?.children[1].children[0].focus();
	}, []);
	useEffect(() => {
		sourceInputRef?.current?.children[1].children[0].value !== "" &&
			destinationInputRef?.current?.children[1].children[0].focus();
	}, [source]);
	useEffect(() => {
		destinationInputRef?.current?.children[1].children[0].value !== "" &&
			dayInputRef?.current?.children[1].children[0].focus();
	}, [destination]);

	useEffect(() => {
		returnDayInputRef?.current?.children[1].children[0].focus();
	}, [isTwoWay]);

	return (
		<FlightSearchContext.Provider
			value={{
				source,
				destination,
				day,
				returnDay,
				numberOfPassengers,
				updateFlightSearchStates,
				isTwoWay,
				updateTwoWay,
				updateDay,
				sourceInputRef,
				destinationInputRef,
				dayInputRef,
				returnDayInputRef,
				sourceError,
				destinationError,
				dayError,
				returnDayError,
				updateErrorState,
				airportNames,
				noOfTravellersInputRef,
				searchButtonRef,
			}}
		>
			{children}
		</FlightSearchContext.Provider>
	);
}
