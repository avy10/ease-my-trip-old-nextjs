import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useEffect, useState } from "react";
import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
export default function DepartureArrivalTimeFilter({
	target,
	updateState,
	state,
}) {
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { filterOptions } = flightSearchModificationCS;
	const [currentSelection, setCurrentSelection] = useState(null);
	function updateCurrentSelection(boxValue, timeLow, timeHigh) {
		setCurrentSelection(boxValue);
		// boxValue can be null

		updateState(target, timeLow, timeHigh);
	}
	useEffect(() => {
		console.log(
			"123 1231 231 231 2 31 3213 132 1     ",
			filterOptions?.arrivalTime,
			filterOptions?.departureTime,
			target
		);
		if (filterOptions?.departureTime && target === "departureTime") {
			const valueHigh = filterOptions?.departureTime?.$lte;
			const valueLow = filterOptions?.departureTime?.$gte;
			console.log("0000000000000000000000", valueLow, valueHigh, target);
			if (valueLow == "00:00" && valueHigh == "06:00") {
				updateCurrentSelection("sunrise", "00:00", "06:00");
			}
			if (valueLow == "06:00" && valueHigh == "12:00") {
				updateCurrentSelection("afternoon", "06:00", "12:00");
			}
			if (valueLow == "12:00" && valueHigh == "18:00") {
				updateCurrentSelection("sunset", "12:00", "18:00");
			}
			if (valueLow == "18:00" && valueHigh == "23:59") {
				updateCurrentSelection("night", "18:00", "23:59");
			}
		}
		if (filterOptions?.arrivalTime && target === "arrivalTime") {
			const valueHigh = filterOptions?.arrivalTime?.$lte;
			const valueLow = filterOptions?.arrivalTime?.$gte;
			console.log("0000000000000000000000", valueLow, valueHigh, target);
			if (valueLow == "00:00" && valueHigh == "06:00") {
				updateCurrentSelection("sunrise", "00:00", "06:00");
			}
			if (valueLow == "06:00" && valueHigh == "12:00") {
				updateCurrentSelection("afternoon", "06:00", "12:00");
			}
			if (valueLow == "12:00" && valueHigh == "18:00") {
				updateCurrentSelection("sunset", "12:00", "18:00");
			}
			if (valueLow == "18:00" && valueHigh == "23:59") {
				updateCurrentSelection("night", "18:00", "23:59");
			}
		}
	}, []);
	return (
		<div className="departure-arrival-time-filter">
			<Sunrise
				currentSelection={currentSelection}
				updateCurrentSelection={updateCurrentSelection}
			/>
			<Afternoon
				currentSelection={currentSelection}
				updateCurrentSelection={updateCurrentSelection}
			/>
			<SunSet
				currentSelection={currentSelection}
				updateCurrentSelection={updateCurrentSelection}
			/>
			<Night
				currentSelection={currentSelection}
				updateCurrentSelection={updateCurrentSelection}
			/>
		</div>
	);
}

function Sunrise({ currentSelection, updateCurrentSelection }) {
	return (
		<div
			className={
				"single-time-point twilight sunrise" +
				`${currentSelection == "sunrise" ? " selected" : ""}`
			}
			onClick={() =>
				currentSelection == "sunrise"
					? updateCurrentSelection(null, null, null)
					: updateCurrentSelection("sunrise", "00:00", "06:00")
			}
		>
			<div className="icon-container">
				<WbTwilightIcon />
				<div className="twilight-sunrise-empty"></div>
				<div className="filter-text">Before 6 AM</div>
			</div>
		</div>
	);
}

function Afternoon({ currentSelection, updateCurrentSelection }) {
	return (
		<div
			className={
				"single-time-point afternoon" +
				`${currentSelection == "afternoon" ? " selected" : ""}`
			}
			onClick={() =>
				currentSelection == "afternoon"
					? updateCurrentSelection(null, null, null)
					: updateCurrentSelection("afternoon", "06:00", "12:00")
			}
		>
			<div className="icon-container">
				<WbSunnyIcon />
				<div className="twilight-sunrise-empty"></div>

				<div className="filter-text">6 AM - 12 PM</div>
			</div>
		</div>
	);
}

function SunSet({ currentSelection, updateCurrentSelection }) {
	return (
		<div
			className={
				"single-time-point twilight sunset" +
				`${currentSelection == "sunset" ? " selected" : ""}`
			}
			onClick={() =>
				currentSelection == "sunset"
					? updateCurrentSelection(null, null, null)
					: updateCurrentSelection("sunset", "12:00", "18:00")
			}
		>
			<div className="twilight-sunset-empty"></div>
			<div className="icon-container">
				<WbTwilightIcon />
				<div className="filter-text">12 PM - 6 PM</div>
			</div>
		</div>
	);
}

function Night({ currentSelection, updateCurrentSelection }) {
	return (
		<div
			className={
				"single-time-point night" +
				`${currentSelection == "night" ? " selected" : ""}`
			}
			onClick={() =>
				currentSelection == "night"
					? updateCurrentSelection(null, null, null)
					: updateCurrentSelection("night", "18:00", "23:59")
			}
		>
			<div className="icon-container">
				<NightsStayIcon />
				<div className="twilight-sunrise-empty"></div>
				<div className="filter-text">After 6 PM</div>
			</div>
		</div>
	);
}
