import FlightsList from "./oneWayFlightsListComponents/FlightsList";
import FilterBox from "../FilterBox";
import OneWayTopBar from "./oneWayFlightsListComponents/OneWayTopBar";
import { useState } from "react";
import Loader from "../../Loader";

export default function OneWay({
	updateLoading,
	sortParamsState,
	updateSortParamsState,
	searchButtonOnclickStateReset,
}) {
	const [flightResultsLoading, setFlightResultsLoading] = useState(true);
	function updateFlightResultsLoading(val) {
		// function to toggle boolean state for loader
		setFlightResultsLoading(val);
	}
	return (
		<div id="one-way-search-page">
			<FilterBox
				updateFlightResultsLoading={updateFlightResultsLoading}
			/>
			<div className="one-way-flights-list">
				<OneWayTopBar
					updateFlightResultsLoading={updateFlightResultsLoading}
					searchButtonOnclickStateReset={
						searchButtonOnclickStateReset
					}
				/>
				{flightResultsLoading && <Loader />}
				<FlightsList
					updateFlightResultsLoading={updateFlightResultsLoading}
					updateLoading={updateLoading}
					sortParamsState={sortParamsState}
					updateSortParamsState={updateSortParamsState}
				/>
			</div>
		</div>
	);
}
