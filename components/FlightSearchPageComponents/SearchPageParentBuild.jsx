import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import FspSearchBox from "@/components/FlightSearchPageComponents/FspSearchBox";
import SearchMainBox from "@/components/FlightSearchPageComponents/SearchPageMainBox";
import { domain, allTheAirports } from "@/public/utils/apiFetch";

import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // ES 2015
import locale_en_in from "dayjs/locale/en-in";
import { useContext, useEffect, useState } from "react";
import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";

export default function SearchPageParentBuild({
	setUnMountSPPB,
	updateLoading,
	toggleUnMountSPPB,
}) {
	dayjs.extend(customParseFormat);

	const fsd = useContext(FlightSearchContext);
	const { updateFlightSearchStates, updateDay, updateTwoWay } = fsd;
	// isAirportNamesLoading,
	// setIsAirportNamesLoading,
	// airportNames,

	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { updateSortOptions, updateFilterOptions } =
		flightSearchModificationCS;
	// flight search data (fsd) from context
	const router = useRouter();
	const searchParams = useSearchParams();

	const [errorInParams, setErrorInParams] = useState(false);
	const [paramsAreLoaded, setParamsAreLoaded] = useState(false);
	const [airportNames, setAirportNames] = useState([]);
	const [isAirportNamesLoading, setIsAirportNamesLoading] = useState(true);

	function searchButtonOnclickStateReset() {
		// resets loading, isAirportNamesLoading and paramsAreLoaded
		// setLoading(true);
		setUnMountSPPB(true);
		setIsAirportNamesLoading(true);
		console.log("airportNames", airportNames);
		setParamsAreLoaded(false);
	}

	async function fetchAirportnames() {
		// console.log("I AM RUNNING first BECAUSE OF ASYNC AWAIT");

		airportNames.length == 0 &&
			(await fetch(`${domain}${allTheAirports}`, {
				method: "GET",
				headers: {
					projectID: "qwqzgpiy336h",
				},
			})
				.then((res) => res.json())
				.then((apiData) => {
					setAirportNames(apiData?.data?.airports);
					setIsAirportNamesLoading(false);
					setParamsAreLoaded(false);
					// return;
				})
				.catch((error) => console.log(error)));
		// console.log("I AM RUNNING LATE BECAUSE OF ASYNC AWAIT");
		airportNames.length > 0 && setIsAirportNamesLoading(false);
	}

	function onComponentMount() {
		// console.log("HOW MANY TIMES I AM RUNNING");
		updateLoading(true);
		// await fetchAirportnames();
		const { twoway, src, dest, day, rday, notv, filter } = router.query;

		updateTwoWay(Boolean(twoway));

		!isAirportNamesLoading &&
			updateFlightSearchStates(
				"source",
				airportNames.filter((ele) => ele.iata_code == src).at(0)
			);
		!isAirportNamesLoading &&
			updateFlightSearchStates(
				"destination",
				airportNames.filter((ele) => ele.iata_code == dest).at(0)
			);
		// console.log("dayURL to dayjs date", dayURL); //params => &day=22-05-2024 ,  for date 22nd May 2024, OUTPUT => dayURL to dayjs date 22-05-2024

		var customParseFormat = require("dayjs/plugin/customParseFormat");
		dayjs.extend(customParseFormat);
		const newDay = dayjs(day, "DD-MM-YYYY", "en-in");
		console.log("dayURL to dayjs date", day, newDay);
		updateDay("day", newDay);
		const newReturnDay = rday ? dayjs(rday, "DD-MM-YYYY", "en-in") : null;
		console.log("return day value on one way", newReturnDay);
		newReturnDay && updateDay("returnDay", newReturnDay);

		updateFlightSearchStates("numberOfPassengers", +notv);
		// setLoading(false);

		const sortParams = searchParams.get("sort");
		const a = JSON.parse(decodeURIComponent(sortParams));
		// console.log("IS DECODE URI WORKING", sortParams, a);
		updateSortOptions(a);
		const filterParams = searchParams.get("filter");
		// console.log("FILTERPARAMS ARE NULL OR UNDEFINED", filter, filterParams);
		if (filter != null || filter != undefined) {
			const filterApplied = JSON.parse(decodeURIComponent(filter));
			updateFilterOptions(filterApplied);
		}
		updateLoading(false);
		setParamsAreLoaded(true);
	}
	useEffect(() => {
		fetchAirportnames();
	}, []);
	useEffect(() => {
		if (isAirportNamesLoading) {
			// if (isAirportNamesLoading) {
			return;
		} else {
			onComponentMount();
		}
		// }, [isAirportNamesLoading]);
	}, [isAirportNamesLoading, paramsAreLoaded]);
	return (
		<div className="flight-search-home">
			<FspSearchBox
				paramsAreLoaded={paramsAreLoaded}
				searchButtonOnclickStateReset={searchButtonOnclickStateReset}
				updateLoading={updateLoading}
			/>
			{paramsAreLoaded && (
				<>
					<SearchMainBox
						updateLoading={updateLoading}
						paramsAreLoaded={paramsAreLoaded}
						searchButtonOnclickStateReset={
							searchButtonOnclickStateReset
						}
					/>
				</>
			)}
		</div>
	);
}
/* 
	return (
		!isAirportNamesLoading && (
			<div className="flight-search-home">
				<FspSearchBox />
				{!errorInParams && (
					<SearchResultsModificationContextProvider>
						{!isAirportNamesLoading && (
							<SearchMainBox paramsAreLoaded={paramsAreLoaded} />
						)}
					</SearchResultsModificationContextProvider>
				)}
			</div>
		)
	);

*/
