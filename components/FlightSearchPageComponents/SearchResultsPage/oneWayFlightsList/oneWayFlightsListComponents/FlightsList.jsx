import { useFlightSearch } from "@/contexts/FlightSearchContext";
import { useEffect, useState } from "react";
import indigo from "@/public/assests/images/icons/indigo.png";
import spicyJett from "@/public/assests/images/icons/SG.png";
import vistara from "@/public/assests/images/icons/UK.png";
import airIndia from "@/public/assests/images/icons/AI.png";
import goAir from "@/public/assests/images/icons/G8.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AirlineSeatLegroomNormalIcon from "@mui/icons-material/AirlineSeatLegroomNormal";
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
	const flightSearchData = useFlightSearch();
	const { source, destination, day, numberOfPassengers } = flightSearchData;

	const [flightListOriginal, setFlightListOriginal] = useState([]);

	useEffect(() => {
		console.log(indigo);
		fetch(
			`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"DEL","destination":"BOM"}&day=Mon`,
			{
				method: "GET",
				headers: {
					projectID: "qwqzgpiy336h",
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setFlightListOriginal(data?.data?.flights);
			});
	}, []);
	return (
		<div>
			{flightListOriginal.map((ele) => {
				const a = 10;
				const flightIDSplit = ele.flightID.split("-");
				const carrierID = flightIDSplit[0];
				const flightNumber = flightIDSplit[2];
				const fullFlightName =
					ICON_SOURCES[carrierID].shortID + "-" + flightNumber;
				// console.log(
				// 	"FLIGHTID SPLIT",
				// 	flightIDSplit,
				// 	carrierID,
				// 	flightNumber,
				// 	fullFlightName
				// );
				return (
					<div className="single-flight-data-container ">
						<div className="top-content">
							<div className="flight-logo-name flex-center-center">
								<div className="flight-logo-container">
									<img
										src={ICON_SOURCES[carrierID].icon.src}
									/>
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
							<div className="flight-price">
								${ele.ticketPrice * numberOfPassengers}
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
						<div className="bottom-content">Flight Detail</div>
						<div className="flight-details">
							Details about Flights
						</div>
					</div>
				);
			})}
		</div>
	);
}
