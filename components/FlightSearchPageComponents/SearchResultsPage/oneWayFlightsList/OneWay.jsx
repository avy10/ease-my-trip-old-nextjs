import FlightsList from "./oneWayFlightsListComponents/FlightsList";
import FilterBox from "../FilterBox";
import OneWayTopBar from "./oneWayFlightsListComponents/OneWayTopBar";

export default function OneWay({
	sortParamsState,
	searchButtonOnclickStateReset,
	setSortParamsState,
}) {
	return (
		<div id="one-way-search-page">
			<FilterBox />
			<div className="one-way-flights-list">
				<OneWayTopBar
					searchButtonOnclickStateReset={
						searchButtonOnclickStateReset
					}
					setSortParamsState={setSortParamsState}
				/>
				<FlightsList
					sortParamsState={sortParamsState}
					setSortParamsState={setSortParamsState}
				/>
			</div>
		</div>
	);
}
