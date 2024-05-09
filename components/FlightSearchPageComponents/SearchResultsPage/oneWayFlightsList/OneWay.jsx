import FlightsList from "./oneWayFlightsListComponents/FlightsList";
import FilterBox from "../FilterBox";
import OneWayTopBar from "./oneWayFlightsListComponents/oneWayTopBar";

export default function OneWay() {
	return (
		<>
			<FilterBox />
			<div className="one-way-flights-list">
				<OneWayTopBar />I AM ON ONEWAY FLIGHTS LIST
				<FlightsList />
			</div>
		</>
	);
}
