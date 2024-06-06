import { useFlightSearch } from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import { useEffect } from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
export default function FlightDetailsContainerDynamic({
	flightData,
	flightIcon,
	carrierName,
	fullFlightName,
}) {
	const flightSearchData = useFlightSearch();
	const { source, destination, day, numberOfPassengers } = flightSearchData;
	let isNextDayArrival = flightData.arrivalTime < flightData.departureTime;
	let nextDayString;
	if (isNextDayArrival) {
		let nextDay = day.add(1, "day");
		// let nextDayWeek = nextDay.format("ddd");
		// let nextDayLonger = nextDay.format("DD MMM YYYY");
		// nextDayString = nextDayWeek + "-" + nextDayLonger;
		nextDayString = nextDay.format("ddd - DD MMM YYYY");
	}
	// useEffect(() => {
	// 	console.log("nextDay IN SINGLE GLIGHEW E GFE A FA ", day);
	// }, []);
	return (
		<>
			<div className="all-the-flights-details">
				<div className="flight-logo-name flex-center-center">
					<div className="flight-logo-container">
						<img src={flightIcon} />
					</div>
					<div className="flight-text-container">
						<h3>{carrierName}</h3>
						<p>{fullFlightName}</p>
						<p>(Economy)</p>
					</div>
				</div>
				<div className="departure-time ">
					<h3>{flightData.departureTime}</h3>
					<p>{`${source.city} (${source.iata_code})`}</p>
					<p>{day.format("ddd - DD MMM YYYY")}</p>
					<p>Terminal 3</p>
				</div>
				<div className="duration-flight-xoox">
					<AccessAlarmsIcon />
					<p>{flightData.duration + "h 00m"}</p>
				</div>
				<div className="arrival-time">
					<h3>{flightData.arrivalTime}</h3>
					<p>{`${destination.city} (${destination.iata_code})`}</p>
					<p>
						{isNextDayArrival
							? nextDayString
							: day.format("ddd - DD MMM YYYY")}
					</p>
					<p>Terminal 3</p>
				</div>
			</div>
			{/* <div className="amenities-single-flight">
				<h4>Amenities</h4>
				<p>afe</p>
				<p>afe</p>
			</div> */}
		</>
	);
}

/* 
<ArrivalDepartureTime
				timeClassName={"arrival - time"}
				time={flightData.arrivalTime}
				airportCity={`${destination.city} (${destination.iata_code})`}
				date={
					isNextDayArrival
						? nextDayString
						: day.format("ddd - DD MMM YYYY")
				}
				terminal={"Terminal 3"}
			/>
*/
function ArrivalDepartureTime({
	timeClassName,
	time,
	airportCity,
	date,
	terminal,
}) {
	return (
		<div className={timeClassName}>
			<h3>{time}</h3>
			<p>{airportCity}</p>
			<p>{date}</p>
			<p>{terminal}</p>
		</div>
	);
}
