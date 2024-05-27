import { useContext, useState, useEffect, useRef } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import dayjs from "dayjs";
import FspAirportAutoCompleteMUI from "./FspAirportAutoCompleteMUI";
import BasicDatePickerFSP from "./BasicDatePickerFSP";
import SelectTravellersNumberFSP from "./SelectTravellersNumberFSP";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
export default function FspInputFields({
	updateLoading,
	state,
	dispatch,
	finalFlightBooking,
	searchButtonOnclickStateReset,
}) {
	const router = useRouter();
	const searchData = useContext(FlightSearchContext);
	const { airportNames, numberOfPassengers } = searchData;
	const sourceInputRefFSP = useRef();
	const destinationInputRefFSP = useRef();
	const dayInputRefFSP = useRef();
	const returnDayInputRefFSP = useRef();
	const noOfTravellersInputRefFSP = useRef();
	// because we want the user to first see the flight results he got he query made on homepage
	// so the refs are only triggered when src is changed
	// for some reason I cant make click() worj on noOfTravellersInputRefFSP ref
	// if he is not satisfied with the flight results, he can then use the search button provided here
	const [sourceChanged, setSourceChanged] = useState(false);
	function updateSourceChanged() {
		setSourceChanged(true);
	}
	function searchButtonClick() {
		updateLoading(true);
		const {
			isTwoWayFSP,
			dayFSP,
			returnDayFSP,
			sourceFSP,
			destinationFSP,
			noOfTravellersFSP,
		} = state;
		let newQueryParams;
		if (!isTwoWayFSP) {
			newQueryParams = {
				src: sourceFSP.iata_code,
				dest: destinationFSP.iata_code,
				day: dayjs(dayFSP).format("DD-MM-YYYY"),
				notv: noOfTravellersFSP,
			};
		}
		router.push(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					...newQueryParams,
				},
			},
			undefined,
			{ shallow: true }
		);
		searchButtonOnclickStateReset();
	}
	useEffect(() => {
		if (!sourceChanged) return;
		sourceInputRefFSP?.current?.children[1].children[0].value !== "" &&
			destinationInputRefFSP?.current?.children[1].children[1].children[1].click();
	}, [state.sourceFSP]);
	useEffect(() => {
		if (!sourceChanged) return;
		destinationInputRefFSP?.current?.children[1].children[0].value !== "" &&
			dayInputRefFSP?.current?.children[1]?.children[1]?.children[0]?.click();
	}, [state.destinationFSP]);
	useEffect(() => {
		if (state.isTwoWayFSP) {
			returnDayInputRefFSP?.current?.children[1]?.children[1]?.children[0]?.click();
		}
	}, [state.isTwoWayFSP]);
	useEffect(() => {
		// console.log(
		// 	noOfTravellersInputRefFSP?.current?.children[0]?.children[1]
		// 		?.children[1]
		// );
		// console.log(noOfTravellersInputRefFSP.current.children);
		if (state.isTwoWayFSP) {
			// console.log("BRIMMM");
			dayInputRefFSP?.current?.children[1].children[0].value !== "" &&
				returnDayInputRefFSP?.current?.children[1]?.children[1]?.children[0]?.click();
		} else {
			// console.log("ABHISHEK");
			const noOfTrravellersElement =
				document.querySelector(".abhishekKumar");
			noOfTrravellersElement.click();
			// dayInputRefFSP?.current?.children[1].children[0].value !== "" &&
			// 	noOfTravellersInputRefFSP?.current.click();
		}
	}, [state.dayFSP]);
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
				<FspAirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={state?.sourceFSP}
					dispatch={dispatch}
					labelText={"FROM"}
					customTheme={customTheme}
					outerTheme={outerTheme}
					customSX={{
						width: 200,
					}}
					sizeValue="small"
					classNameValue="fsp-autocomplete"
					type={"updateSourceFSP"}
					keyToUpdate={"sourceFSP"}
					refTarget={sourceInputRefFSP}
					updateSourceChanged={updateSourceChanged}
				/>
			</div>
			<div className="fsp-single-search-component">
				<label className="fsp-label-text-user">
					TO
					<FlightLandIcon />
				</label>
				<FspAirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={state?.destinationFSP}
					dispatch={dispatch}
					labelText={"TO"}
					customTheme={customTheme}
					outerTheme={outerTheme}
					customSX={{ width: 200 }}
					classNameValue="fsp-autocomplete"
					sizeValue="small"
					type={"updateDestinationFSP"}
					keyToUpdate={"destinationFSP"}
					refTarget={destinationInputRefFSP}
				/>
			</div>
			<BasicDatePickerFSP
				targetVALUE={state?.dayFSP}
				dispatch={dispatch}
				type={"updateDayFSP"}
				keyToUpdate={"dayFSP"}
				labelText={"Choose your Departure date"}
				paraText="DEPARTURE DATE"
				children={<CalendarMonthIcon />}
				classNameValueForPTag="label-text-user-white"
				classNameValueForDivTag="fsp-date-container"
				className="white-text-field"
				finalFlightBooking={finalFlightBooking}
				slotPropsValue={{
					textField: { size: "small" },
				}}
				refTarget={dayInputRefFSP}
			/>
			{!state?.isTwoWayFSP && (
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
			{state?.isTwoWayFSP && (
				<BasicDatePickerFSP
					targetVALUE={state?.returnDayFSP}
					dispatch={dispatch}
					type={"updateReturnDayFSP"}
					keyToUpdate={"returnDayFSP"}
					labelText={"Choose your Return date"}
					paraText="RETURN DATE"
					minReturnDay={state?.dayFSP}
					finalFlightBooking={finalFlightBooking}
					children={<CalendarMonthIcon />}
					classNameValueForPTag="label-text-user-white"
					classNameValueForDivTag="fsp-date-container"
					className="white-text-field"
					slotPropsValue={{
						textField: { size: "small" },
					}}
					refTarget={returnDayInputRefFSP}
				/>
			)}
			<div className="fsp-no-of-travellers">
				<p>
					TRAVELLERS
					{state?.noOfTravellersFSP == "1" && <PersonIcon />}
					{state?.noOfTravellersFSP >= "2" && <PeopleAltIcon />}
				</p>
				<SelectTravellersNumberFSP
					numberOfPassengers={state?.noOfTravellersFSP}
					sizeValue="small"
					dispatch={dispatch}
					refTarget={noOfTravellersInputRefFSP}
				/>
				<p></p>
			</div>
			<div className="fsp-search-button-div">
				<p></p>
				<button
					className="fsp-search-button"
					onClick={searchButtonClick}
				>
					Search
				</button>
				<p></p>
			</div>
		</div>
	);
}
