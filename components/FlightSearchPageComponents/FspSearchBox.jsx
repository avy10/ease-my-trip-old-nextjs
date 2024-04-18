import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";

import FspInputFields from "./FspSearchBoxComponents/FspInputFields";
import FspRadioButtons from "./FspSearchBoxComponents/FspRadioButtons";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelectTravellersNumber from "../Flights/Search/SelectTravellersNumber";

// FspSearchBox => Flight Search Page - Search Box
export default function FspSearchBox() {
	const fsd = useContext(FlightSearchContext);
	const { source, updateFlightSearchStates, updateDay, airportNames } = fsd;
	const router = useRouter();
	const searchParams = useSearchParams();
	const [errorInParams, setErrorInParams] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	// material UI state and function for backdrops
	const [open, setOpen] = useState(true);
	// useEffect to get the data from URL search params
	// ?twoway=true&src=DEL&dest=BOM&day=
	useEffect(() => {
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

		const isAirportNamesLoading = airportNames?.length == 0;
		console.log("isTwoWay", isTwoWayURL);
		console.log("source", sourceURL);
		console.log(
			"source details",
			airportNames.length != 0 &&
				airportNames.filter((ele) => ele.iata_code == sourceURL).at(0)
		);
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
		// console.log("dayURL to dayjs date", dayURL);
		const newDay = dayjs(dayURL, "DD-MM-YYYY");
		console.log("dayURL to dayjs date", newDay.$W);
		updateDay("day", newDay);
	}, [router.isReady, airportNames]);
	return (
		<div className="search-page-blue-search-box">
			<FspRadioButtons />
			<FspInputFields />
		</div>
	);
}
