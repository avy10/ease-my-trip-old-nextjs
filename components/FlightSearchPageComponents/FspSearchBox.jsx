import { useEffect, useReducer, useState } from "react";
import { useFlightSearch } from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";

import FspInputFields from "./FspSearchBoxComponents/FspInputFields";
import FspRadioButtons from "./FspSearchBoxComponents/FspRadioButtons";

// FspSearchBox => Flight Search Page - Search Box

function reducer(state, action) {
	// console.log("MUI IS MAKING ME RUN", action.payload);
	let x = action.keyToUpdate;
	switch (action.type) {
		case "stateUpdate":
			return { ...state, ...action.payload };
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

export default function FspSearchBox({
	updateLoading,
	paramsAreLoaded,
	searchButtonOnclickStateReset,
}) {
	const contextState = useFlightSearch();
	const { day } = contextState;
	const obj = {
		isTwoWayFSP: false,

		sourceErrorFSP: false,
		destinationErrorFSP: false,
		dayErrorFSP: false,
		returnDayErrorFSP: false,
		fspSourceERR: false,
		fspDestinationERR: false,
		fspDayERR: false,
		fspReturnDayERR: false,
	};

	const today = dayjs();
	// console.log(
	// 	today,
	// 	"inside fsp search box for max flight date calculations"
	// );
	const [finalFlightBooking] = useState(today.add(8, "months"));
	const [state, dispatch] = useReducer(reducer, obj);

	useEffect(() => {
		const {
			day,
			returnDay,
			source,
			destination,
			numberOfPassengers,
			isTwoWay,
		} = contextState;
		dispatch({
			type: "stateUpdate",
			payload: {
				dayFSP: day,
				returnDayFSP: returnDay,
				sourceFSP: source,
				destinationFSP: destination,
				noOfTravellersFSP: numberOfPassengers,
				isTwoWayFSP: isTwoWay,
			},
		});
	}, [paramsAreLoaded]);
	return (
		<>
			{paramsAreLoaded && (
				<div className="search-page-blue-search-box">
					<FspRadioButtons
						dispatch={dispatch}
						isTwoWayFSP={state.isTwoWayFSP}
					/>
					<FspInputFields
						updateLoading={updateLoading}
						searchButtonOnclickStateReset={
							searchButtonOnclickStateReset
						}
						state={state}
						dispatch={dispatch}
						finalFlightBooking={finalFlightBooking}
					/>
				</div>
			)}
		</>
	);
}
