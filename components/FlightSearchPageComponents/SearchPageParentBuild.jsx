import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import FspSearchBox from "@/components/FlightSearchPageComponents/FspSearchBox";
import SearchMainBox from "@/components/FlightSearchPageComponents/SearchPageMainBox";
import { domain, allTheAirports } from "@/public/utils/apiFetch";

import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import SearchResultsModificationContextProvider from "@/contexts/SearchResultsModificationContext";
/* 
		// !isAirportNamesLoading &&
		updateFlightSearchStates("source", sourceURL, "notTrusty");
		// !isAirportNamesLoading &&
		updateFlightSearchStates("destination", destinationURL, "notTrusty");
*/

export default function SearchPageParentBuild({ loading, setLoading }) {
	const fsd = useContext(FlightSearchContext);
	const {
		source,
		updateFlightSearchStates,
		updateDay,

		updateTwoWay,
	} = fsd;
	// flight search data (fsd) from context
	const router = useRouter();
	const searchParams = useSearchParams();

	const [errorInParams, setErrorInParams] = useState(false);
	const [paramsAreLoaded, setParamsAreLoaded] = useState(false);
	const [airportNames, setAirportNames] = useState([]);
	const [isAirportNamesLoading, setIsAirportNamesLoading] = useState(true);
	// useEffect to get the data from URL search params
	// ?twoway=true&src=DEL&dest=BOM&day=
	useEffect(() => {
		console.log(router.isReady);
		fetch(`${domain}${allTheAirports}`, {
			method: "GET",
			headers: {
				projectID: "4xh7gn2pv8it",
			},
		})
			.then((res) => res.json())
			.then((apiData) => {
				setAirportNames(apiData?.data?.airports);
				// setIsAirportNamesLoading(false);
				// updateFlightSearchStates("source", apiData?.data?.airports[7]);
				// updateFlightSearchStates(
				// 	"destination",
				// 	apiData?.data?.airports[8]
				// );
				setIsAirportNamesLoading(false);
			})
			.catch((error) => console.log(error));
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
		const noOfTravellersURL = searchParams.get("notv");

		// const isAirportNamesLoading = airportNames?.length == 0;
		// console.log("isTwoWay", typeof isTwoWayURL); //string ofc
		// console.log("source", sourceURL);
		updateTwoWay(Boolean(isTwoWayURL));
		// console.log(
		// 	"source details",
		// 	airportNames.length != 0 &&
		// 		airportNames.filter((ele) => ele.iata_code == sourceURL).at(0)
		// );
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
		console.log("dayURL to dayjs date", dayURL);
		if (dayURL != null) {
			const newDay = dayjs(dayURL, "DD-MM-YYYY");
			console.log("dayURL to dayjs date", newDay);
			updateDay("day", newDay);
			const newReturnDay = returnDayURL
				? dayjs(returnDayURL, "DD-MM-YYYY")
				: null;
			console.log("return day value on one way", newReturnDay);
			newReturnDay && updateDay("returnDay", newReturnDay);
		}
		updateFlightSearchStates("numberOfPassengers", +noOfTravellersURL);
		setLoading(false);
		setParamsAreLoaded(true);
	}, [router.isReady, isAirportNamesLoading]);
	return (
		!loading && (
			<div className="flight-search-home">
				<FspSearchBox />
				{!errorInParams && (
					<SearchResultsModificationContextProvider>
						<SearchMainBox paramsAreLoaded={paramsAreLoaded} />
					</SearchResultsModificationContextProvider>
				)}
			</div>
		)
	);
}
