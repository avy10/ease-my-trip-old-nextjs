import { useContext } from "react";

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
	// const [airportNames, setAirportNames] = useState([]);
	const searchData = useContext(FlightSearchContext);

	const {
		source,
		destination,
		day,
		returnDay,
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

	function handleSearchNavigation() {}
	return (
		<div className="main-box">
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
				minReturnDay={day}
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
				<button className="search-button">Search</button>
				<p></p>
			</div>
		</div>
	);
}
