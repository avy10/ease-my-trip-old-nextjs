import FlightIcon from "@mui/icons-material/Flight";
import { ICON_SOURCES } from "@/public/utils/FlightUtils/airlineDecoding";
import { useEffect, useState } from "react";
import { Box, Container, Modal } from "@mui/material";
import { createPortal } from "react-dom";

import {
	FlightLogoName,
	FlightTimings,
} from "../SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/FlightDetailsContainerDynamic";
import dayjs from "dayjs";
import BaggageInformation from "../SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/BaggageInformation";
import { Height } from "@mui/icons-material";
import FareDetails from "../SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/FareDetails";
import FareRules from "../SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/FareRules";
const response = {
	message: "success",
	data: {
		_id: "651d52c38c0d85935523030d",
		flightID: "G801-DELBOM-978",
		airline: "65144a1b664a43628887c461",
		aircraftModel: "65144571e16702a399cea7fa",
		source: "DEL",
		destination: "BOM",
		departureTime: "21:35",
		arrivalTime: "00:35",
		duration: 3,
		stops: 2,
		ticketPrice: 2497,
		availableSeats: 73,
		amenities: ["In-flight entertainment", "Complimentary beverage"],
		__v: 1,
		dayOfOperation: ["Fri", "Wed", "Tue", "Thu", "Sat", "Sun", "Mon"],
	},
};

export default function FlightReview({ fid, updateFlightFare }) {
	const [flightDetails, setFlightDetails] = useState([]);
	const [stops, setStops] = useState("Non-Stop");
	const [srcCity, setSrcCity] = useState("Delhi");
	const [destCity, setDestCity] = useState("Mumbai");
	const [flightDay, setFlightDay] = useState(undefined);
	const [numberOfPassengers, setNumberOfPassengers] = useState(1);
	// // MODAL
	// const [showModal, setShowModal] = useState(false);

	// const handleOpen = () => setShowModal(true);
	// const handleClose = () => setShowModal(false);
	//
	// FLight review content

	//
	useEffect(() => {
		const citiesData = JSON.parse(localStorage.getItem("citiesData"));
		const { sourceCity, destinationCity, day, numberOfPassengers } =
			citiesData;
		setSrcCity(sourceCity);
		setDestCity(destinationCity);
		setFlightDay(day);
		setNumberOfPassengers(numberOfPassengers);

		console.log("reloading", citiesData);
		const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${fid}`;
		fetch(url, {
			method: "GET",
			headers: {
				projectID: "qwqzgpiy336h",
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setFlightDetails(result?.data);
				if (result?.data?.stops == 0) {
					setStops("Non-Stop");
				}
				if (result?.data?.stops == 1) {
					setStops("One-Stop");
				}
				if (result?.data?.stops == 2) {
					setStops("Two-Stops");
				}
				updateFlightFare(result?.data?.ticketPrice);
				// localStorage.removeItem("citiesData");
			});
	}, [fid]);
	return (
		<div className="flight-details-review">
			<FlightReviewHeader
				srcCity={srcCity}
				destCity={destCity}
				stops={stops}
				duration={flightDetails?.duration}
			/>
			<FlightReviewContent
				flightData={flightDetails}
				srcCity={srcCity}
				destCity={destCity}
				flightDay={flightDay}
				numberOfPassengers={numberOfPassengers}
				flightPrice={flightDetails?.ticketPrice}
			/>
			{/* <BaggageInformation /> */}
			{/* <div className="extra-flight-details-modals">
				<div onClick={() => setShowModal(true)}>Fare Rules</div>
				<div onClick={() => setShowModal(true)}>Baggage</div>

				{showModal &&
					createPortal(
						<FlightReviewModal
							showModal={showModal}
							handleClose={handleClose}
							children={
								<BaggageInformation
									flightIcon={flightIcon}
									carrierName={carrierName}
									fullFlightName={fullFlightName}
								/>
							}
						/>,
						document.body
					)}
			</div> */}
		</div>
	);
}
function FlightReviewHeader({ srcCity, destCity, stops, duration }) {
	return (
		<div className="flight-review-header">
			<FlightIcon sx={{ fontSize: "35px" }} />
			<div className="flight-header-data">
				<p id="city-names">{srcCity + " - " + destCity} </p>
				<p id="smol-details">
					ECONOMY | {stops} | {0 + "" + duration + "H 00m"}
				</p>
			</div>
		</div>
	);
}

function FlightReviewContent({
	flightData,
	srcCity,
	destCity,
	flightDay,
	numberOfPassengers,
	flightPrice,
}) {
	const flightFullID = flightData?.flightID;
	const flightIDSplit = flightFullID?.split("-");
	const carrierID = flightIDSplit ? flightIDSplit[0] : "loading";
	const flightNumber = flightIDSplit ? flightIDSplit[2] : "loading";
	const fullFlightName =
		ICON_SOURCES[carrierID]?.shortID + "-" + flightNumber;
	const flightDayFormatted = dayjs(flightDay);
	const [modalChildren, setModalChildren] = useState(<p></p>);
	/*  */
	// MODAL
	const [showModal, setShowModal] = useState(false);

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);
	const baggageInfo = (
		<BaggageInformation
			flightIcon={ICON_SOURCES[carrierID]?.icon?.src}
			carrierName={ICON_SOURCES[carrierID]?.name ?? "loading"}
			fullFlightName={fullFlightName}
		/>
	);
	const fareDetailsInfo = (
		<FareRules
			numberOfPassengers={numberOfPassengers}
			flightPrice={flightPrice}
			renderTnC={true}
		/>
	);
	/*  */
	return (
		<div className="flight-review-entire-content-box">
			<div className="flight-review-content ">
				{console.log("arrivalTiming", flightDay, srcCity, destCity)}
				<FlightLogoName
					renderEconomy={false}
					flightIcon={ICON_SOURCES[carrierID]?.icon?.src}
					carrierName={ICON_SOURCES[carrierID]?.name ?? "loading"}
					fullFlightName={fullFlightName}
				/>
				<FlightTimings
					flightData={flightData}
					sourceCity={srcCity}
					sourceIata={flightData?.source}
					arrivalDay={flightDayFormatted}
					destinationCity={destCity}
					destinationIata={flightData?.destination}
					flightDuration={flightData?.duration}
				/>
			</div>

			<div className="extra-flight-details-modals">
				<div
					onClick={() => {
						setShowModal(true);
						setModalChildren(fareDetailsInfo);
					}}
				>
					Fare Rules
				</div>
				<div
					onClick={() => {
						setShowModal(true);
						setModalChildren(baggageInfo);
					}}
				>
					Baggage
				</div>

				{showModal &&
					createPortal(
						<FlightReviewModal
							showModal={showModal}
							handleClose={handleClose}
							children={modalChildren}
						/>,
						document.body
					)}
			</div>
		</div>
	);
}

export function FlightReviewModal({ showModal, handleClose, children }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		height: "fit-content",
		width: "fit-content",
		backgroundColor: "white",
	};
	return (
		<Modal open={showModal} onClose={handleClose}>
			<Box sx={style} className="login-modal">
				{children}
				<button className="flex-center-center" onClick={handleClose}>
					x
				</button>
			</Box>
		</Modal>
	);
}
// maxWidth: "50vw",
// 		minWidth: "100vw",

// border: "4px solid orange",
