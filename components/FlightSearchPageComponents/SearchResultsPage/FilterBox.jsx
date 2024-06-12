import Divider from "@mui/material/Divider";
import { airlineCodes } from "@/public/utils/FlightUtils/airlineDecoding";
import { useEffect, useState } from "react";
import AirlinesIcon from "@mui/icons-material/Airlines";

import AirlineFilterBox from "./oneWayFilterBox/AirlineFilterBox";
import RangeSlider from "./oneWayFilterBox/RangeSlider";
import StopsFilter from "./oneWayFilterBox/StopsFilterBox";
import DepartureArrivalTimeFilter from "./oneWayFilterBox/DepartureArrivalTimeFilter";
import { useRouter } from "next/router";
import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
// RANGE SLIDER .JSX

export default function FilterBox({ updateFlightResultsLoading }) {
	const router = useRouter();
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { updateFilterOptions } = flightSearchModificationCS;

	const [departureTimeFilter, setDepartureTimeFilter] = useState(null);
	const [arrivalTimeFilter, setArrivalTimeFilter] = useState(null);
	const [firstTimeTimingFilterUse, setFirstTimeTimingFilterUse] =
		useState(true);
	// "departureTime" : {"$lte": "18:00", "$gte" : "09:00" }
	async function updateState(target, valueLow, valueHigh) {
		if (target == "arrivalTime") {
			setArrivalTimeFilter({ valueLow, valueHigh });
		} else if (target == "departureTime") {
			setDepartureTimeFilter({ valueLow, valueHigh });
		}

		const { src, dest, day, notv, sort, filter, airlines } = router.query;
		const a = JSON.parse(decodeURIComponent(sort));
		const requiredObjects = {
			src,
			dest,
			day,
			notv,
			sort,
		};
		let filterOldDecoded;
		if (filter) {
			filterOldDecoded = JSON.parse(decodeURIComponent(filter));
		}
		if (airlines) {
			requiredObjects.airlines = airlines;
		}
		console.log("INSIDE THE FILTER BOX", filterOldDecoded);

		const newFilter = {
			...filterOldDecoded,
			arrivalTime: {
				$lte: valueHigh,
				$gte: valueLow,
			},
			departureTime: {
				$lte: valueHigh,
				$gte: valueLow,
			},
		};
		if (valueHigh == null || valueLow == null) {
			delete newFilter[target];
		}
		if (target == "arrivalTime") {
			newFilter.departureTime = {
				$lte: departureTimeFilter?.valueHigh,
				$gte: departureTimeFilter?.valueLow,
			};
		}
		if (target == "departureTime") {
			newFilter.arrivalTime = {
				$lte: arrivalTimeFilter?.valueHigh,
				$gte: arrivalTimeFilter?.valueLow,
			};
		}

		if (target == "arrivalTime" && departureTimeFilter?.valueHigh == null) {
			delete newFilter["departureTime"];
		}
		if (target == "departureTime" && arrivalTimeFilter?.valueHigh == null) {
			delete newFilter["arrivalTime"];
		}
		const departureTimeFilterOld = filterOldDecoded?.departureTime
			? filterOldDecoded?.departureTime
			: {};
		const arrivalTimeFilterOld = filterOldDecoded?.arrivalTime
			? filterOldDecoded?.arrivalTime
			: {};
		console.log(
			"TIMING FILTERS INSIDE FILTER BOX",
			Object.keys(departureTimeFilterOld),
			"\n",
			Object.keys(arrivalTimeFilterOld)
		);
		if (firstTimeTimingFilterUse) {
			if (Object.keys(departureTimeFilterOld).length > 0) {
				newFilter.departureTime = { ...departureTimeFilterOld };
			}
			if (Object.keys(arrivalTimeFilterOld).length > 0) {
				newFilter.arrivalTime = { ...arrivalTimeFilterOld };
			}
			setFirstTimeTimingFilterUse(false);
			console.log("VERY NEW FILTER inside the timing boolean", newFilter);
		}
		// if (filterOldDecoded?.departureTime != undefined)
		console.log("VERY NEW FILTER", newFilter);
		const stringifiedFilterValue = JSON.stringify(newFilter);
		// filter={ "duration" : {"$lte":3,"$gte":0},
		const encodedFilters = encodeURIComponent(stringifiedFilterValue);
		await router.replace(
			{
				pathname: router.pathname,
				query: {
					...requiredObjects,
					filter: encodedFilters,
				},
			},
			undefined,
			{ shallow: true }
		);
		updateFilterOptions(newFilter);
	}

	return (
		<div className="flights-filter-box">
			<h3>FILTER</h3>
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>
			<AirlineFilterBox />
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">
				Price Range<span>(per person)</span>
			</p>
			<RangeSlider
				updateFlightResultsLoading={updateFlightResultsLoading}
			/>
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<StopsFilter
				updateFlightResultsLoading={updateFlightResultsLoading}
			/>
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">Departure from Delhi</p>
			<DepartureArrivalTimeFilter
				target="departureTime"
				updateState={updateState}
				state={departureTimeFilter}
			/>
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">Arrival at Mumbai</p>
			<DepartureArrivalTimeFilter
				target="arrivalTime"
				updateState={updateState}
				state={arrivalTimeFilter}
			/>
		</div>
	);
}
