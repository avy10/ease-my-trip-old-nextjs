import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { ICON_SOURCES } from "@/public/utils/FlightUtils/airlineDecoding";

export default function AirlineFilterBox() {
	const [airlineCodes] = useState([
		"6E001",
		"AI001",
		"UK001",
		"SG001",
		"G801",
	]);
	const [selectedAirlines, setSelectedAirlines] = useState([...airlineCodes]);
	const [allSelection, setAllSelection] = useState(true);

	function toggleAllSelection(event) {
		setAllSelection(event.target.checked);
	}
	function updateSelectedAirlines(event, airlineValue, isOnly = false) {
		if (isOnly) {
			setSelectedAirlines([airlineValue]);
			setAllSelection(false);
		} else {
			if (event?.target?.checked) {
				setSelectedAirlines((prev) => [...prev, airlineValue]);
			} else {
				const newArray = selectedAirlines.filter(
					(element) => element != airlineValue
				);
				setSelectedAirlines(newArray);
			}
		}
	}
	return (
		<div className="airline-name-filter-box">
			<p className="filter-box-name">Airlines</p>
			<div className="airline-names">
				<ul>
					<li>
						<Checkbox
							inputProps={{
								"aria-label": `ALL AIRLINES`,
							}}
							sx={{
								color: "#2196F3",
								"&.Mui-checked": {
									color: "#2196F3",
								},
								"& .MuiSvgIcon-root": { fontSize: 20 },
							}}
							checked={allSelection}
							onChange={toggleAllSelection}
						/>
						<span>ALL AIRLINES</span>
					</li>
					{airlineCodes.map((ele, index) => (
						<AirlineList
							key={index}
							ele={ele}
							selectedAirlines={selectedAirlines}
							updateSelectedAirlines={updateSelectedAirlines}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

function AirlineList({ ele, selectedAirlines, updateSelectedAirlines }) {
	const [showOnly, setShowOnly] = useState(false);
	return (
		<li
			onMouseEnter={() => setShowOnly(true)}
			onMouseLeave={() => setShowOnly(false)}
		>
			<Checkbox
				inputProps={{ "aria-label": `${ICON_SOURCES[ele].name}` }}
				sx={{
					color: "#2196F3",
					"&.Mui-checked": {
						color: "#2196F3",
					},
					"& .MuiSvgIcon-root": { fontSize: 20 },
				}}
				checked={selectedAirlines.includes(ele)}
				onChange={(event) => updateSelectedAirlines(event, ele)}
			/>
			<div className="icon-box">
				<img src={ICON_SOURCES[ele].icon.src} />
			</div>
			<div className="airline-name">
				<p>{ICON_SOURCES[ele].name}</p>
			</div>
			{showOnly && (
				<div
					className="only-button"
					onClick={() => {
						updateSelectedAirlines(event, ele, true);
					}}
				>
					only
				</div>
			)}
		</li>
	);
}
