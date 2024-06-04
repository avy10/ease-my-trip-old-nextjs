import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useState } from "react";
export default function DepartureArrivalTimeFilter({
	target,
	updateState,
	state,
}) {
	const [currentSelection, setCurrentSelection] = useState(null);
	function updateCurrentSelection(boxValue, timeLow, timeHigh) {
		setCurrentSelection(boxValue);
		// boxValue can be null

		updateState(target, timeLow, timeHigh);
	}
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
