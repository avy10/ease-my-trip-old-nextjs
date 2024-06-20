import FlightIcon from "@mui/icons-material/Flight";
import { ICON_SOURCES } from "@/public/utils/FlightUtils/airlineDecoding";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
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

export default function FlightReview({ fid }) {
	const [flightDetails, setFlightDetails] = useState([]);
	const [stops, setStops] = useState("Non-Stop");
	const [srcCity, setSrcCity] = useState("Delhi");
	const [destCity, setDestCity] = useState("Mumbai");
	useEffect(() => {
		const citiesData = JSON.parse(localStorage.getItem("citiesData"));
		const { sourceCity, destinationCity } = citiesData;
		setSrcCity(sourceCity);
		setDestCity(destinationCity);
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
			I AM ALWAYS ON TOP {fid}
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

function FlightReviewContent() {}
