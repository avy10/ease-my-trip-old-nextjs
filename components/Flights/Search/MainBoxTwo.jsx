import React, { useContext, useEffect, useState } from "react";

import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import AirportSearchBoxes from "./AirportSearchBoxes";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import SelectTravellersNumber from "./SelectTravellersNumber";
// snackbar
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// MUI ICONS
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { useRouter } from "next/router";
export default function MainBoxTwo() {
	const router = useRouter();
	// const [airportNames, setAirportNames] = useState([]);
	const searchData = useContext(FlightSearchContext);
	const [fromPopUp, setFromPopUp] = useState(true);
	const [toPopUp, setToPopUp] = useState(true);
	const {
		source,
		destination,
		day,
		returnDay,
		numberOfPassengers,
		updateFlightSearchStates,
		isTwoWay,
		updateDay,
		airportNames,
		sourceError,
		destinationError,
		updateErrorState,
		sourceInputRef,
		destinationInputRef,
		dayInputRef,
		returnDayInputRef,
		noOfTravellersInputRef,
		dayError,
		returnDayError,
	} = searchData;
	function popUpController(val) {
		if (val == "from") {
			setToPopUp(false);
			setFromPopUp(true);
			// setFromPopUp((prev) => !prev);
		}
		if (val == "to") {
			setFromPopUp(false);
			setToPopUp(true);
		}
	}
	return (
		<div className="main-box-two">
			{/* <div>FROM</div> */}
			{/* <div>TWO</div> */}
			<FlightBox
				showPopUp={fromPopUp}
				popUpController={popUpController}
				avyTarget="from"
			/>
			<FlightBox
				showPopUp={toPopUp}
				popUpController={popUpController}
				avyTarget="to"
			/>

			<div>DATE</div>
			<div>RETURN DATE</div>
			<div>NO OF TRAVELLERS</div>
			<div>SEARCH</div>
		</div>
	);
}

function FlightBox({ showPopUp, popUpController, avyTarget }) {
	return (
		<div className="airport-select">
			<div className="airport-select-fields">
				<p>FROM</p>
				<input></input>
				<p>indira gandhi intl </p>
			</div>
			<div
				className="airport-select-overlay"
				onClick={() => popUpController(avyTarget)}
			>
				ewwe
			</div>
			{showPopUp && <FlightBoxPopUp />}
		</div>
	);
}

function FlightBoxPopUp() {
	return <div className="airport-select-popup-box">I am a popup</div>;
}
