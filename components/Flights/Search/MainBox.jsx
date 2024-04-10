import { useState, useEffect, useContext } from "react";

import { domain, allTheAirports } from "@/public/utils/apiFetch";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import AirportSearchBoxes from "./AirportSearchBoxes";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import SelectTravellersNumber from "./SelectTravellersNumber";
// MUI ICONS
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function MainBox() {
	const [airportNames, setAirportNames] = useState([]);
	const searchData = useContext(FlightSearchContext);

	const {
		source,
		destination,
		day,
		returnDay,
		updateFlightSearchStates,
		isTwoWay,
		updateDay,
	} = searchData;
	const finalFlightBooking = dayjs().add(8, "months");
	useEffect(() => {
		fetch(`${domain}${allTheAirports}`, {
			method: "GET",
			headers: {
				projectID: "4xh7gn2pv8it",
			},
		})
			.then((res) => res.json())
			.then((apiData) => {
				setAirportNames(apiData?.data?.airports);
				updateFlightSearchStates("source", apiData?.data?.airports[7]);
				updateFlightSearchStates(
					"destination",
					apiData?.data?.airports[8]
				);
			});
	}, []);
	// useEffect(() => {
	// 	console.log(airportNames);
	// 	console.log(source);
	// 	console.log(destination);
	// }, [airportNames]);

	function handleSearchNavigation() {}
	return (
		<div className="main-box">
			<AirportSearchBoxes
				airportNames={airportNames}
				target={source}
				labelText="FROM"
				children={<FlightTakeoffIcon />}
			/>
			<AirportSearchBoxes
				airportNames={airportNames}
				target={destination}
				labelText="TO"
				children={<FlightLandIcon />}
			/>
			<BasicDatePicker
				targetVALUE={day}
				labelText={"Choose your Departure date"}
				paraText="DEPARTURE DATE"
				updateTarget="day"
				updateState={updateDay}
				children={<CalendarMonthIcon />}
				classNameValueForPTag="label-text-user"
				classNameValueForDivTag="date-container"
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
					labelText={"Choose your Return date"}
					paraText="RETURN DATE"
					minReturnDay={day}
					updateTarget="returnDay"
					updateState={updateDay}
					children={<CalendarMonthIcon />}
					finalFlightBooking={finalFlightBooking}
					classNameValueForPTag="label-text-user"
					classNameValueForDivTag="date-container"
				/>
			)}
			<div className="no-of-travellers">
				<p>No. of Travellers</p>
				<SelectTravellersNumber />
				<p></p>
			</div>
			<div className="search-button-div">
				<p></p>
				<button className="search-button">Search</button>
				<p></p>
			</div>
		</div>
	);
}
