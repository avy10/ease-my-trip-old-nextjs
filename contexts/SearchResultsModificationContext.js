import { airlineCodes } from "@/public/utils/FlightUtils/airlineDecoding";
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const SearchResultsModificationContext = createContext();
function reducer(state, action) {}
export default function SearchResultsModificationContextProvider({ children }) {
	const [isURLModified, setIsURLModified] = useState(false);
	function updateIsURLModified(val) {
		setIsURLModified(val);
	}

	const [sortOptions, setSortOptions] = useState({});
	function updateSortOptions(value) {
		setSortOptions(value);
	}
	const [filterOptions, setFilterOptions] = useState(null);
	function updateFilterOptions(value) {
		setFilterOptions(value);
	}

	// SORTING
	// GLOBAL SORTING

	// original flight list
	const [originalFlightList, setOriginalFlightList] = useState([]);
	function updateOriginalFlightList(value) {
		setOriginalFlightList(value);
	}
	// FlightPrice min and max

	// one way arrival and departure filters
	// const [departureTimeFilterOneWay, setDepartureTimeFilterOneWay] =
	// 	useState(null);
	// const [arrivalTimeFilterOneWay, setArrivalTimeFilterOneWay] =
	// 	useState(null);
	// function updateArrivalDepartureOneWayState(target, valueLow, valueHigh) {
	// 	if (target == "arrivalTime") {
	// 		setArrivalTimeFilterOneWay({ valueLow, valueHigh });
	// 	} else if (target == "departureTime") {
	// 		setDepartureTimeFilterOneWay({ valueLow, valueHigh });
	// 	}

	// 	const { src, dest, day, notv, sort, filter } = router.query;
	// 	const requiredObjects = {
	// 		src,
	// 		dest,
	// 		day,
	// 		notv,
	// 		sort,
	// 	};
	// 	let filterOldDecoded;
	// 	if (filter) {
	// 		filterOldDecoded = JSON.parse(decodeURIComponent(filter));
	// 	}
	// 	console.log("FILTER FROM URL PARAMS", filterOldDecoded);
	// 	const newFilter = {
	// 		...filterOldDecoded,
	// 		arrivalTime: {
	// 			$lte: valueHigh,
	// 			$gte: valueLow,
	// 		},
	// 		departureTime: {
	// 			$lte: valueHigh,
	// 			$gte: valueLow,
	// 		},
	// 	};
	// 	if (valueHigh == null || valueLow == null) {
	// 		delete newFilter[target];
	// 	}
	// 	if (target == "arrivalTime") {
	// 		newFilter.departureTime = {
	// 			$lte: departureTimeFilterOneWay?.valueHigh,
	// 			$gte: departureTimeFilterOneWay?.valueLow,
	// 		};
	// 	}
	// 	if (target == "departureTime") {
	// 		newFilter.arrivalTime = {
	// 			$lte: arrivalTimeFilterOneWay?.valueHigh,
	// 			$gte: arrivalTimeFilterOneWay?.valueLow,
	// 		};
	// 	}

	// 	if (
	// 		target == "arrivalTime" &&
	// 		departureTimeFilterOneWay?.valueHigh == null
	// 	) {
	// 		delete newFilter["departureTime"];
	// 	}
	// 	if (
	// 		target == "departureTime" &&
	// 		arrivalTimeFilterOneWay?.valueHigh == null
	// 	) {
	// 		delete newFilter["arrivalTime"];
	// 	}
	// 	console.log("VERY NEW FILTER", newFilter);
	// 	const stringifiedFilterValue = JSON.stringify(newFilter);
	// 	// filter={ "duration" : {"$lte":3,"$gte":0},
	// 	const encodedFilters = encodeURIComponent(stringifiedFilterValue);
	// 	updateFilterOptions(newFilter);
	// 	router.replace(
	// 		{
	// 			pathname: router.pathname,
	// 			query: {
	// 				...requiredObjects,
	// 				filter: encodedFilters,
	// 			},
	// 		},
	// 		undefined,
	// 		{ shallow: true }
	// 	);
	// }

	return (
		<SearchResultsModificationContext.Provider
			value={{
				isURLModified,
				updateIsURLModified,
				sortOptions,
				updateSortOptions,

				originalFlightList,
				updateOriginalFlightList,
				filterOptions,
				updateFilterOptions,
			}}
		>
			{children}
		</SearchResultsModificationContext.Provider>
	);
}

export function useSearchResultsModificationContext() {
	return useContext(SearchResultsModificationContext);
}
