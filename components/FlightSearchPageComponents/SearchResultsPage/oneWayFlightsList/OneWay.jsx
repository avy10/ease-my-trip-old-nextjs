import FlightsList from "./oneWayFlightsListComponents/FlightsList";
import FilterBox from "../FilterBox";
import OneWayTopBar from "./oneWayFlightsListComponents/OneWayTopBar";

export default function OneWay() {
	return (
		<>
			<FilterBox />
			<div className="one-way-flights-list">
				<OneWayTopBar />
				<FlightsList />
			</div>
		</>
	);
}
