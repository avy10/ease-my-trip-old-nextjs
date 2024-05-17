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

	return (
		<div className="airline-name-filter-box">
			<p className="filter-box-name">Airlines</p>
			<div className="airline-names">
				<ul>
					{airlineCodes.map((ele, index) => (
						<AirlineList key={index} ele={ele} />
					))}
				</ul>
			</div>
		</div>
	);
}

function AirlineList({ ele }) {
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
			/>
			<div className="icon-box">
				<img src={ICON_SOURCES[ele].icon.src} />
			</div>
			<div className="airline-name">
				<p>{ICON_SOURCES[ele].name}</p>
			</div>
			{showOnly && <div className="only-button">only</div>}
		</li>
	);
}
