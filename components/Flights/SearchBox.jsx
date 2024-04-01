import React, { useContext, useEffect, useState } from "react";
import { domain, allTheAirports } from "@/public/utils/apiFetch";
import AirportAutoCompleteMUI from "../Custom-MUI-Components/AirportAutoCompleteMUI";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import RadioButtons from "./RadioButtons";
import BasicDatePicker from "../Custom-MUI-Components/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
export default function SearchBox() {
	return (
		<div className="flightSearchBox">
			<div className="innerBox">
				<div className="flight-pre-info">
					<RadioButtons />
					<div className="boxTitle poppins-extrabold">
						Search Lowest Price
					</div>
				</div>
				<MainBox />
			</div>
		</div>
	);
}

function MainBox() {
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
		<div className="mainBox">
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
			<div className="travellerNums">
				<p>No. of Travellers</p>
				<SelectTravellersNumber />
			</div>
		</div>
	);
}

function AirportSearchBoxes({
	airportNames,
	target,
	labelText,
	updateFlightSearchStates,
}) {
	return (
		<>
			<div className="singleSearchComponent">
				<label>{labelText}</label>
				<AirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={target}
					labelText={labelText}
				/>
				<p>
					{target?.name ? (
						target.name
					) : (
						<span className="errorAirportName">
							Select an Airport
						</span>
					)}
				</p>
			</div>
		</>
	);
}

function SelectTravellersNumber() {
	const [number, setNumber] = useState(1);
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">
					Number of Travellers
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={number}
					label="Select a number"
					onChange={(e) => setNumber(e.target.value)}
				>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={6}>6</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
