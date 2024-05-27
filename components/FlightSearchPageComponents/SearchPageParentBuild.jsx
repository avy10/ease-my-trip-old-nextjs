import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import FspSearchBox from "@/components/FlightSearchPageComponents/FspSearchBox";
import SearchMainBox from "@/components/FlightSearchPageComponents/SearchPageMainBox";
import { domain, allTheAirports } from "@/public/utils/apiFetch";

import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import SearchResultsModificationContextProvider, {
	useSearchResultsModificationContext,
} from "@/contexts/SearchResultsModificationContext";

export default function SearchPageParentBuild({
	setUnMountSPPB,
	updateLoading,
}) {
	const fsd = useContext(FlightSearchContext);
	const { updateFlightSearchStates, updateDay, updateTwoWay } = fsd;

	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { sortOptions, updateSortOptions } = flightSearchModificationCS;
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
		setParamsAreLoaded(false);
	}
	async function fetchAirportnames() {
		airportNames.length == 0 &&
			(await fetch(`${domain}${allTheAirports}`, {
				method: "GET",
				headers: {
					projectID: "4xh7gn2pv8it",
				},
			})
				.then((res) => res.json())
				.then((apiData) => {
					setAirportNames(apiData?.data?.airports);
					setIsAirportNamesLoading(false);
					setParamsAreLoaded(false);
					return;
				})
				.catch((error) => console.log(error)));
	}

	async function onComponentMount() {
		updateLoading(true);
		await fetchAirportnames();
		const isTwoWayURL = searchParams.get("twoway");
		const sourceURL = searchParams.get("src"); //iata_code
		const destinationURL = searchParams.get("dest"); ///iata_code
		const dayURL = searchParams.get("day");
		// const dayD = searchParams.get("dayD");
		// const dayM = searchParams.get("dayM");
		// const dayY = searchParams.get("dayY");
		// const dayW = searchParams.get("dayW");
		const returnDayURL = searchParams.get("rday");

		// in future when I design my own API, the day and returnDay params will get extended
		// let flight date be 12th April 2024
		// dayD=12,dayM=3,dayY=2024, dayW=5
		// in dayjs, month is 0 based index, hence month[3] is April
		// similarly, returnD, returnM, returnY, returnW
		// instead of doing tha, just format the date into DD-MM-YYYY format lol, no need to individually take D, M, YY and then combine them
		const noOfTravellersURL = searchParams.get("notv");

		updateTwoWay(Boolean(isTwoWayURL));

		!isAirportNamesLoading &&
			updateFlightSearchStates(
				"source",
				airportNames.filter((ele) => ele.iata_code == sourceURL).at(0)
			);
		!isAirportNamesLoading &&
			updateFlightSearchStates(
				"destination",
				airportNames
					.filter((ele) => ele.iata_code == destinationURL)
					.at(0)
			);
		// console.log("dayURL to dayjs date", dayURL); //params => &day=22-05-2024 ,  for date 22nd May 2024, OUTPUT => dayURL to dayjs date 22-05-2024
		if (dayURL != null) {
			const newDay = dayjs(dayURL, "DD-MM-YYYY");
			// console.log("dayURL to dayjs date", newDay);
			updateDay("day", newDay);
			const newReturnDay = returnDayURL
				? dayjs(returnDayURL, "DD-MM-YYYY")
				: null;
			// console.log("return day value on one way", newReturnDay);
			newReturnDay && updateDay("returnDay", newReturnDay);
		}
		updateFlightSearchStates("numberOfPassengers", +noOfTravellersURL);
		// setLoading(false);

		const sortParams = searchParams.get("sort");
		const a = JSON.parse(decodeURIComponent(sortParams));
		// console.log("IS DECODE URI WORKING", a);
		updateSortOptions(a);
		updateLoading(false);
		!isAirportNamesLoading && setParamsAreLoaded(true);
	}

	// useEffect to get the data from URL search params
	// ?twoway=true&src=DEL&dest=BOM&day=
	useEffect(() => {
		// console.log(router.isReady);
		// console.log("isAirportNamesLoading", isAirportNamesLoading);
		onComponentMount();
	}, [router.isReady, isAirportNamesLoading, paramsAreLoaded]);
	return (
		<div className="flight-search-home">
			<FspSearchBox
				paramsAreLoaded={paramsAreLoaded}
				searchButtonOnclickStateReset={searchButtonOnclickStateReset}
				updateLoading={updateLoading}
			/>
			{!errorInParams && (
				<>
					{!isAirportNamesLoading && (
						<SearchMainBox
							updateLoading={updateLoading}
							paramsAreLoaded={paramsAreLoaded}
						/>
					)}
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
