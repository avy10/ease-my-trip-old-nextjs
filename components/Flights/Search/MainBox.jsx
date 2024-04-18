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
export default function MainBox() {
	const router = useRouter();
	// const [airportNames, setAirportNames] = useState([]);
	const searchData = useContext(FlightSearchContext);

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
	const today = dayjs();
	const finalFlightBooking = today.add(8, "months");
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [sourceAndDestinationSame, setSourceAndDestinationSame] =
		useState(false);
	const [snackBarMSG, setSnackBarMSG] = useState(
		"Source and Destination should not be same"
	);
	function swapSourceDestination() {
		updateFlightSearchStates("source", destination);
		updateFlightSearchStates("destination", source);
	}

	function handleClose() {
		setOpenSnackBar(false);
	}
	function handleSearchNavigation() {
		// form validation checks
		if (source?.iata_code == null || source?.iata_code == undefined) {
			setOpenSnackBar(true);
			setSnackBarMSG("Source should not be empty");
			sourceInputRef?.current?.children[1].children[0].focus();

			return;
		}
		if (
			destination?.iata_code == null ||
			destination?.iata_code == undefined
		) {
			setOpenSnackBar(true);
			setSnackBarMSG("Destination should not be empty");
			destinationInputRef?.current?.children[1].children[0].focus();

			return;
		}
		if (sourceAndDestinationSame) {
			sourceInputRef?.current?.children[1].children[0].focus();
			return;
		}
		if (dayError) {
			setOpenSnackBar(true);
			setSnackBarMSG("Please pick a correct date");
			dayInputRef?.current?.children[1].children[0].focus();
			return;
		}
		if (returnDayError) {
			setOpenSnackBar(true);
			setSnackBarMSG("Please pick a correct date");
			returnDayInputRef?.current?.children[1].children[0].focus();
			return;
		}
		// const localisedFormat = require("dayjs/plugin/localizedFormat");
		// dayjs.extend(localisedFormat);
		// const routerDay = dayjs(day).format("L");
		const routerDay = dayjs(day).format("DD-MM-YYYY");
		const routerReturnDay = dayjs(returnDay).format("DD-MM-YYYY");
		// console.log("routerDay", routerDay);

		router.push(
			`/flights/search?twoway=${isTwoWay}&src=${source.iata_code}&dest=${destination.iata_code}&day=${routerDay}&rday=${routerReturnDay}&notv=${numberOfPassengers}`
		);
	}

	useEffect(() => {
		if (source?.iata_code == destination?.iata_code) {
			setSourceAndDestinationSame(true);
			setOpenSnackBar(true);
			sourceInputRef?.current?.children[1].children[0].focus();
		} else {
			setSourceAndDestinationSame(false);
		}
	}, [source, destination]);
	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);
	return (
		<div className="main-box">
			<Snackbar
				open={openSnackBar}
				autoHideDuration={3000}
				onClose={handleClose}
				message={snackBarMSG}
				action={action}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			/>
			<AirportSearchBoxes
				airportNames={airportNames ? airportNames : []}
				target={source}
				labelText="FROM"
				children={<FlightTakeoffIcon />}
				airportErrorTarget={sourceError}
				updateErrorState={updateErrorState}
				keyVal="srcErr"
				refTarget={sourceInputRef}
			/>
			<div className="main-box-swap-button">
				<button onClick={swapSourceDestination}>
					<SwapHorizontalCircleIcon />
				</button>
			</div>
			<AirportSearchBoxes
				airportNames={airportNames ? airportNames : []}
				target={destination}
				labelText="TO"
				children={<FlightLandIcon />}
				airportErrorTarget={destinationError}
				updateErrorState={updateErrorState}
				keyVal="destErr"
				refTarget={destinationInputRef}
			/>
			<BasicDatePicker
				targetVALUE={day}
				// labelText={"Choose your Departure date"}
				labelText={"Pick a Departure date"}
				paraText="DEPARTURE DATE"
				updateTarget="day"
				updateState={updateDay}
				children={<CalendarMonthIcon />}
				classNameValueForPTag="label-text-user"
				classNameValueForDivTag="date-container"
				dateErrorTarget={dayError}
				updateErrorState={updateErrorState}
				refTarget={dayInputRef}
				keyVal="dayErr"
				finalFlightBooking={finalFlightBooking}
				// minReturnDay={day}
			/>
			{!isTwoWay && (
				<div className="date-container">
					<div className="avy-date-container"></div>
					<p className="round-trip-persuasion">
						Book a Round Trip to save more
					</p>
					<div className="avy-date-container"></div>
				</div>
			)}
			{isTwoWay && (
				<BasicDatePicker
					targetVALUE={returnDay}
					// labelText={"Choose your Return date"}
					labelText={"Pick a Return date"}
					paraText="RETURN DATE"
					minReturnDay={day}
					updateTarget="returnDay"
					updateState={updateDay}
					children={<CalendarMonthIcon />}
					finalFlightBooking={finalFlightBooking}
					classNameValueForPTag="label-text-user"
					classNameValueForDivTag="date-container"
					dateErrorTarget={returnDayError}
					updateErrorState={updateErrorState}
					refTarget={returnDayInputRef}
					keyVal="returnDayErr"
				/>
			)}
			<div className="no-of-travellers">
				<p>No. of Travellers</p>
				<SelectTravellersNumber refTarget={noOfTravellersInputRef} />
				<p></p>
			</div>
			<div className="search-button-div">
				<p></p>
				<button
					onClick={handleSearchNavigation}
					className="search-button"
				>
					Search
				</button>
				<p></p>
			</div>
		</div>
	);
}
