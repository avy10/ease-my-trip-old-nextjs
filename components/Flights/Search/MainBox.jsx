import { useState, useEffect, useContext } from "react";

import { domain, allTheAirports } from "@/public/utils/apiFetch";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import AirportSearchBoxes from "./AirportSearchBoxes";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import SelectTravellersNumber from "./SelectTravellersNumber";
export default function MainBox() {
	const [airportNames, setAirportNames] = useState([]);
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
	return (
		<div className="main-box">
			<AirportSearchBoxes
				airportNames={airportNames}
				target={source}
				labelText="FROM"
			/>
			<AirportSearchBoxes
				airportNames={airportNames}
				target={destination}
				labelText="TO"
			/>
			<BasicDatePicker
				targetVALUE={day}
				labelText={"Choose your Departure date"}
				paraText="DEPARTURE DATE"
				updateTarget="day"
				updateState={updateDay}
			/>
			{isTwoWay && (
				<BasicDatePicker
					targetVALUE={returnDay}
					labelText={"Choose your Return date"}
					paraText="RETURN DATE"
					minReturnDay={day}
					updateTarget="returnDay"
					updateState={updateDay}
					finalFlightBooking={finalFlightBooking}
				/>
			)}
			<div className="no-of-travellers">
				<p>No. of Travellers</p>
				<SelectTravellersNumber />
			</div>
		</div>
	);
}
