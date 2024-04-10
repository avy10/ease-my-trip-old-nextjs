import { domain, allTheAirports } from "@/public/utils/apiFetch";

import { useContext, useState, useEffect } from "react";
import AirportAutoCompleteMUI from "@/components/Custom-MUI-Components/AirportAutoCompleteMUI";
import FlightSearchContext from "@/contexts/FlightSearchContext";

import styles from "./fspInputFields.module.css";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import { createTheme, useTheme } from "@mui/material/styles";
import SelectTravellersNumber from "@/components/Flights/Search/SelectTravellersNumber";
export default function FspInputFields() {
	const [airportNames, setAirportNames] = useState([]);
	const searchData = useContext(FlightSearchContext);
	const {
		day,
		updateDay,
		isTwoWay,
		returnDay,
		source,
		destination,
		updateFlightSearchStates,
		finalFlightBooking,
	} = searchData;
	// make an api call here, see useeffect in MainBox.jsx
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
	const customTheme = (outerTheme) =>
		createTheme({
			palette: {
				mode: outerTheme.palette.mode,
			},
			components: {
				MuiTextField: {
					styleOverrides: {
						root: {
							"--TextField-brandBorderColor": "red",
							"--TextField-brandBorderHoverColor": "red",
							"--TextField-brandBorderFocusedColor": "red",

							"& label.Mui-focused, label ": {
								color: "white",
								fontWeight: 600,
								fontSize: "1.15rem",
							},

							"& .MuiOutlinedInput-root": {
								backgroundColor: "none",
								width: "180px",
							},

							"& .MuiAutocomplete-input": {
								backgroundColor: "none",
								color: "white",
								fontSize: "1.15rem",
							},
						},
					},
				},
			},
		});
	const outerTheme = useTheme();
	return (
		<div className="fsp-input-fields">
			<div className="fsp-single-search-component">
				<label className="fsp-label-text-user">
					FROM
					<FlightTakeoffIcon />
				</label>
				<AirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={source}
					labelText={"FROM"}
					customTheme={customTheme}
					outerTheme={outerTheme}
					customSX={{
						width: 200,
					}}
					sizeValue="small"
					classNameValue="fsp-autocomplete"
				/>
			</div>
			<div className="fsp-ssingle-search-component">
				<label className="fsp-label-text-user">
					TO
					<FlightLandIcon />
				</label>
				<AirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={destination}
					labelText={"TO"}
					customTheme={customTheme}
					outerTheme={outerTheme}
					customSX={{ width: 200 }}
					classNameValue="fsp-autocomplete"
					sizeValue="small"
				/>
			</div>
			<BasicDatePicker
				targetVALUE={day}
				labelText={"Choose your Departure date"}
				paraText="DEPARTURE DATE"
				updateTarget="day"
				updateState={updateDay}
				children={<CalendarMonthIcon />}
				classNameValueForPTag="label-text-user-white"
				classNameValueForDivTag="fsp-date-container"
				className="white-text-field"
				slotPropsValue={{
					textField: { size: "small" },
				}}
			/>
			{!isTwoWay && (
				<div className="date-container">
					<div className="fsp-avy-round-trip">
						<div className="avy-date-container"></div>
						<p
							className="fsp-round-trip-persuasion"
							style={{ fontSize: "0.85rem", color: "white" }}
						>
							Book a Round Trip to save more
						</p>
						<div className="avy-date-container"></div>
					</div>
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
					finalFlightBooking={finalFlightBooking}
					children={<CalendarMonthIcon />}
					classNameValueForPTag="label-text-user-white"
					classNameValueForDivTag="fsp-date-container"
					className="white-text-field"
					slotPropsValue={{
						textField: { size: "small" },
					}}
				/>
			)}
			<div className="fsp-no-of-travellers">
				<p>No. of Travellers</p>
				<SelectTravellersNumber sizeValue="small" />
				<p></p>
			</div>
			<div className="fsp-search-button-div">
				<p></p>
				<button className="fsp-search-button">Search</button>
				<p></p>
			</div>
		</div>
	);
}
