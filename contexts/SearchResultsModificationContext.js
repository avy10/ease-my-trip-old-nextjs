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
	// FILTERS
	// global filter i.e. works on both oneWay and twoWay
	const [singleAirlineSelector, setSingleAirlineSelector] = useState("");

	// states for slider
	const [ticketPriceSliderMINM, setTicketPriceSliderMINM] = useState(100);
	const [ticketPriceSliderMAXM, setTicketPriceSliderMAXM] = useState(200);
	const [ticketSliderValue, setTicketSliderValue] = useState([
		ticketPriceSliderMINM,
		ticketPriceSliderMAXM,
	]); //holds the value which is modified by the slider

	// there will be two-copies for similar state, reason is that I wanna implement two-way search as well and it would require 2 different API calls of same endpoint at once
	// in order to make those 2 different calls, I would need to manage state differently
	// specific filter for one-way

	// stops
	const oneWayStopsBoolean = {
		nonStop: true,
		oneStop: true,
		onePlusStop: true,
	};

	const [oneWayStopsBooleanState, dispatchOneWayStops] = useReducer(
		reducer,
		oneWayStopsBoolean
	);

	//departure time
	const oneWayDepartureTimeBoolean = {
		beforeSix: false,
		sixToTwelve: false,
		twelveToEighteen: false,
		afterEighteen: false,
	};

	const [oneWayDepartureTimeBooleanState, dispatchOneWayDepartureTime] =
		useReducer(reducer, oneWayDepartureTimeBoolean);

	//arrival time
	const oneWayArrivalTimeBoolean = {
		beforeSix: false,
		sixToTwelve: false,
		twelveToEighteen: false,
		afterEighteen: false,
	};

	const [oneWayArrivalTimeBooleanState, dispatchOneWayArrivalTime] =
		useReducer(reducer, oneWayArrivalTimeBoolean);

	// specific filter for two-way
	// stops
	const twoWayStopsBoolean = {
		nonStop: true,
		oneStop: true,
		onePlusStop: true,
	};

	const [twoWayStopsBooleanState, dispatchTwoWayStops] = useReducer(
		reducer,
		twoWayStopsBoolean
	);
	const twoWayDepartureTimeBoolean = {
		beforeSix: false,
		sixToTwelve: false,
		twelveToEighteen: false,
		afterEighteen: false,
	};

	const [twoWayDepartureTimeBooleanState, dispatchTwoWayDepartureTime] =
		useReducer(reducer, twoWayDepartureTimeBoolean);
	//arrival time
	const twoWayArrivalTimeBoolean = {
		beforeSix: false,
		sixToTwelve: false,
		twelveToEighteen: false,
		afterEighteen: false,
	};

	const [twoWayArrivalTimeBooleanState, dispatchTwoWayArrivalTime] =
		useReducer(reducer, twoWayArrivalTimeBoolean);

	// SORTING
	// GLOBAL SORTING

	// original flight list
	const [originalFlightList, setOriginalFlightList] = useState([]);
	function updateOriginalFlightList(value) {
		setOriginalFlightList(value);
	}
	// FlightPrice min and max

	return (
		<SearchResultsModificationContext.Provider
			value={{
				isURLModified,
				updateIsURLModified,
				sortOptions,
				updateSortOptions,
				singleAirlineSelector,
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
