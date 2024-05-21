import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useReducer, useState } from "react";
import FlightSearchContext, {
	useFlightSearch,
} from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";

import FspInputFields from "./FspSearchBoxComponents/FspInputFields";
import FspRadioButtons from "./FspSearchBoxComponents/FspRadioButtons";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelectTravellersNumber from "../Flights/Search/SelectTravellersNumber";

// FspSearchBox => Flight Search Page - Search Box

function reducer(state, action) {
	let x = action.keyToUpdate;
	switch (action.type) {
		case "updateSourceFSP":
			return { ...state, [x]: action.payload };
		case "updateIsTwoWay":
			return { ...state, [x]: action.payload };
		case "updateDayFSP":
			return { ...state, [x]: action.payload };
		case "updateReturnDayFSP":
			return { ...state, [x]: action.payload };
		case "updateDestinationFSP":
			return { ...state, [x]: action.payload };
		case "updateNumberOfTravellers":
			return { ...state, [x]: action.payload };
		default:
			return state;
	}
}

export default function FspSearchBox() {
	const [errorInParams, setErrorInParams] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	// material UI state and function for backdrops
	const [open, setOpen] = useState(true);

	const contextState = useFlightSearch();
	const { day, returnDay, source, destination } = contextState;
	const obj = {
		isTwoWayFSP: false,
		dayFSP: day,
		returnDayFSP: returnDay,
		sourceFSP: source,
		destinationFSP: destination,
		sourceErrorFSP: false,
		destinationErrorFSP: false,
		dayErrorFSP: false,
		returnDayErrorFSP: false,
		fspSourceERR: false,
		fspDestinationERR: false,
		fspDayERR: false,
		fspReturnDayERR: false,
		noOfTravellersFSP: 1,
	};

	const today = dayjs();
	const [finalFlightBooking] = useState(today.add(8, "months"));
	// const finalFlightBooking = today.add(8, "months");

	// useEffect(() => {
	// 	// console.log("DAYFSP", obj.dayFSP);
	// 	console.log("finalFlightBooking IN FSPSB", finalFlightBooking);
	// }, []);
	useEffect(() => {}, []);
	const [state, dispatch] = useReducer(reducer, obj);
	return (
		<div className="search-page-blue-search-box">
			<FspRadioButtons
				isTwoWayFSP={state.isTwoWayFSP}
				dispatch={dispatch}
			/>
			<FspInputFields
				state={state}
				dispatch={dispatch}
				finalFlightBooking={finalFlightBooking}
			/>
		</div>
	);
}
