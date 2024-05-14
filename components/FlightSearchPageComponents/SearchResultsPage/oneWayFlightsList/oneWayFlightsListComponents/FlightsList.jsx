import { useFlightSearch } from "@/contexts/FlightSearchContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import indigo from "@/public/assests/images/icons/indigo.png";
import spicyJett from "@/public/assests/images/icons/SG.png";
import vistara from "@/public/assests/images/icons/UK.png";
import airIndia from "@/public/assests/images/icons/AI.png";
import goAir from "@/public/assests/images/icons/G8.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AirlineSeatLegroomNormalIcon from "@mui/icons-material/AirlineSeatLegroomNormal";
import SingleFlightDetailsMain from "./singleFlightDetail/SingleFlightDetailsMain";
const ICON_SOURCES = {
	"6E001": {
		name: "IndiGo",
		shortID: "6E",
		icon: indigo,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/indigo.png",
	},

	AI001: {
		name: "Air India",
		shortID: "AI",
		icon: airIndia,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/AI.png",
	},
	UK001: {
		name: "Vistara",
		shortID: "UK",
		icon: vistara,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/UK.png",
	},
	SG001: {
		name: "SpiceJet",
		shortID: "SG",
		icon: spicyJett,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/SG.png",
	},
	G801: {
		name: "Go Air",
		shortID: "G8",
		icon: goAir,
		icon2: "https://raw.githubusercontent.com/avy10/assestsForNSReactProjects/main/icons/G8.png",
	},
};
export default function FlightsList() {
	const router = useRouter();
	const flightSearchData = useFlightSearch();
	const { source, destination, day, numberOfPassengers } = flightSearchData;

	const [flightListOriginal, setFlightListOriginal] = useState([]);
	const [showFlightDetails, setShowFlightDetails] = useState([]);
	useEffect(() => {
		// `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"
		// 	DEL","destination":"BOM"}&day=Mon`,
		console.log(indigo);
		const flightDayWeekName = dayjs(day).format("ddd");
		const url =
			`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"` +
			source?.iata_code +
			`","destination":"` +
			destination?.iata_code +
			`"}&day=` +
			"Mon";
		fetch(url, {
			method: "GET",
			headers: {
				projectID: "qwqzgpiy336h",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data?.data?.flights);
				setFlightListOriginal(data?.data?.flights);
			});
	}, [router.isReady]);
	return (
		<div>
			{flightListOriginal.map((ele) => {
				return (
					<AllTheCards
						ele={ele}
						source={source}
						destination={destination}
						numberOfPassengers={numberOfPassengers}
						key={ele._id}
					/>
				);
			})}
		</div>
	);
}

function AllTheCards({ ele, source, destination, numberOfPassengers }) {
	const [showFlightDetails, setShowFlightDetails] = useState(false);
	const a = 10;
	const flightIDSplit = ele.flightID.split("-");
	const carrierID = flightIDSplit[0];
	const flightNumber = flightIDSplit[2];
	const fullFlightName = ICON_SOURCES[carrierID].shortID + "-" + flightNumber;
	// console.log(
	// 	"FLIGHTID SPLIT",
	// 	flightIDSplit,
	// 	carrierID,
	// 	flightNumber,
	// 	fullFlightName
	// );
	function handleSetShowFlightDetails() {
		setShowFlightDetails((prev) => !prev);
	}
	return (
		<>
			{
				<div className="single-flight-data-container" key={ele._id}>
					<div className="top-content">
						<div className="flight-logo-name flex-center-center">
							<div className="flight-logo-container">
								<img src={ICON_SOURCES[carrierID].icon.src} />
							</div>
							<div className="flight-text-container">
								<h3>{ICON_SOURCES[carrierID].name}</h3>
								<p>{fullFlightName}</p>
							</div>
						</div>

						<div className="departure-time ">
							<h3>{ele.departureTime}</h3>
							<p>{source.city}</p>
						</div>
						<div className="flight-duration-stops flex-center-center">
							<p
								className={
									ele.stops == 0
										? "fastest"
										: ele.stops == 1
										? "medium"
										: "hard"
								}
							>
								{ele.duration + "h 00m"}
							</p>
							<div className="arrow-right-direction"></div>
							<p className="flight-stops">
								{ele.stops == 0
									? "Nonstop"
									: ele.stops == 1
									? `1-stop`
									: `${ele.stops}-stops`}
							</p>
						</div>
						<div className="arrival-time">
							<h3>{ele.arrivalTime}</h3>
							<p>{destination.city}</p>
						</div>
						<div className="flight-price ">
							<div>
								<CurrencyRupeeIcon />
								{ele.ticketPrice * numberOfPassengers}
							</div>
							<p>
								{numberOfPassengers == 1
									? `${numberOfPassengers} adult`
									: `${numberOfPassengers} adults`}
							</p>
						</div>
						<div className="flight-book-seats">
							<button className="flight-booking-button">
								Book Now
							</button>
							<div
								className={
									ele.availableSeats >= 10
										? "seats-remaining"
										: "seats-remaining low-seats-left"
								}
							>
								<AirlineSeatLegroomNormalIcon />
								<p>
									{ele.availableSeats > 10
										? ele.availableSeats
										: `${ele.availableSeats} Seats left`}
								</p>
							</div>
						</div>
						{/* <p key={ele._id}>{ele.flightID}</p> */}
					</div>
					<div
						className="bottom-content"
						onClick={handleSetShowFlightDetails}
					>
						{showFlightDetails ? "Hide Details" : "Flight Details"}
					</div>
					{showFlightDetails && (
						<SingleFlightDetailsMain
							key={ele._id + "FD"}
							flightID={ele._id}
							handleSetShowFlightDetails={
								handleSetShowFlightDetails
							}
							flightIcon={ICON_SOURCES[carrierID].icon.src}
							carrierName={ICON_SOURCES[carrierID].name}
							fullFlightName={fullFlightName}
						/>
					)}
				</div>
			}
		</>
	);
}
