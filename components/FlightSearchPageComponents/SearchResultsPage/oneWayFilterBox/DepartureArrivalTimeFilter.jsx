import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
export default function DepartureArrivalTimeFilter() {
	return (
		<div className="departure-arrival-time-filter">
			<Sunrise />
			<Afternoon />
			<SunSet />
			<Night />
		</div>
	);
}

function Sunrise() {
	return (
		<div className="single-time-point twilight sunrise">
			<div className="icon-container">
				<WbTwilightIcon sx={{ color: "#737373" }} />
				<div className="twilight-sunrise-empty"></div>
				<div className="filter-text">Before 6 AM</div>
			</div>
		</div>
	);
}

function Afternoon() {
	return (
		<div className="single-time-point afternoon">
			<div className="icon-container">
				<WbSunnyIcon sx={{ color: "#737373" }} />
				<div className="twilight-sunrise-empty"></div>

				<div className="filter-text">6 AM - 12 PM</div>
			</div>
		</div>
	);
}

function SunSet() {
	return (
		<div className="single-time-point twilight sunset">
			<div className="twilight-sunset-empty"></div>
			<div className="icon-container">
				<WbTwilightIcon sx={{ color: "#737373" }} />
				<div className="filter-text">12 PM - 6 PM</div>
			</div>
		</div>
	);
}

function Night() {
	return (
		<div className="single-time-point night">
			<div className="icon-container">
				<NightsStayIcon sx={{ color: "#737373" }} />
				<div className="twilight-sunrise-empty"></div>
				<div className="filter-text">After 6 PM</div>
			</div>
		</div>
	);
}
