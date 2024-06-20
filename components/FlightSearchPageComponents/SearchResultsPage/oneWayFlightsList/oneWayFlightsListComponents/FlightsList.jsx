import { useFlightSearch } from "@/contexts/FlightSearchContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ICON_SOURCES } from "@/public/utils/FlightUtils/airlineDecoding";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AirlineSeatLegroomNormalIcon from "@mui/icons-material/AirlineSeatLegroomNormal";
import SingleFlightDetailsMain from "./singleFlightDetail/SingleFlightDetailsMain";
import { useSearchParams } from "next/navigation";
import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";

export default function FlightsList({
	updateLoading,
	sortParamsState,
	setSortParamsState,
	updateFlightResultsLoading,
}) {
	const router = useRouter();
	const flightSearchData = useFlightSearch();
	const { source, destination, day, numberOfPassengers } = flightSearchData;

	const flightSearchModificationCS = useSearchResultsModificationContext();
	const {
		isURLModified,
		updateIsURLModified,
		sortOptions,
		filterOptions,
		updateFilterOptions,
		updateOriginalFlightList,
	} = flightSearchModificationCS;
	const [flightListOriginal, setFlightListOriginal] = useState([]);
	const [flightListModified, setFlightListModified] = useState([]);
	const [showFlightDetails, setShowFlightDetails] = useState([]);

	const [firstLoading, setFirstLoading] = useState(true);
	const [oldURL, setOldURL] = useState("");
	const [isMultipleAirlineFilter, setIsMultipleAirlineFilter] =
		useState(false);
	// const searchParams = useSearchParams();
	// function flightSearchResultFetch() {
	// 	// console.log("SORT OPTIONS INSIDE FLIGHTLIST", sortOptions);
	// 	// console.log("FILTER OPTIONS INSIDE FLIGHTLIST", filterOptions);
	// 	// `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"
	// 	// 	DEL","destination":"BOM"}&day=Mon`,

	// 	// if(airlines)
	// 	console.log("LOOK AT THE DATE", day);
	// 	const flightDayWeekName = dayjs(day).format("ddd");
	// 	console.log("LOOK AT THE DATE", flightDayWeekName);

	// 	const url =
	// 		`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"` +
	// 		source?.iata_code +
	// 		`","destination":"` +
	// 		destination?.iata_code +
	// 		`"}&day=` +
	// 		flightDayWeekName +
	// 		`&sort=${JSON.stringify(sortOptions)}` +
	// 		`${
	// 			filterOptions ? "&filter=" + JSON.stringify(filterOptions) : ""
	// 		}`;
	// 	console.log("old url", oldURL);
	// 	console.log("new url", url);

	// 	if (url == oldURL) {
	// 		return;
	// 	} else {
	// 		setOldURL(url);
	// 	}
	// 	fetch(url, {
	// 		method: "GET",
	// 		headers: {
	// 			projectID: "qwqzgpiy336h",
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data?.data?.flights);
	// 			setFlightListOriginal(data?.data?.flights);
	// 			updateOriginalFlightList(data?.data?.flights);
	// 			setHasApiFetched(true);
	// 			updateFlightResultsLoading(false);
	// 			updateIsURLModified(false);
	// 			updateLoading(false);
	// 		});
	// }
	async function flightSearchResultFetchNew() {
		// console.log("HOW MANY TIMES I AM FETCHING");
		// console.log("SORT OPTIONS INSIDE FLIGHTLIST", sortOptions);
		// console.log("FILTER OPTIONS INSIDE FLIGHTLIST", filterOptions);
		// `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"
		// 	DEL","destination":"BOM"}&day=Mon`,
		const { src, dest, day, notv, sort, filter, airlines } = router.query;
		console.log("airlines present in flight list", airlines);

		// if(airlines)
		// console.log("LOOK AT THE DATE", day);
		const flightDayWeekName = dayjs(day, "DD-MM-YYYY").format("ddd");
		// console.log("LOOK AT THE DATE", flightDayWeekName);

		const url =
			`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"` +
			src +
			`","destination":"` +
			dest +
			`"}&day=` +
			flightDayWeekName +
			`&sort=${sort}` +
			`${
				filterOptions != undefined
					? "&filter=" + JSON.stringify(filterOptions)
					: ""
			}`;
		// console.log("old url", oldURL);
		// console.log("new url", url);
		// console.log("SORT IN FLIGHTLIST", sort);
		// console.log("filter IN FLIGHTLIST", filter);

		// if (url == oldURL) {
		// 	return;
		// } else {
		// 	setOldURL(url);
		// }
		let flightDataArray = [];
		await fetch(url, {
			method: "GET",
			headers: {
				projectID: "qwqzgpiy336h",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data?.data?.flights);
				setFlightListOriginal(data?.data?.flights);
				flightDataArray = [...data?.data?.flights];
				updateOriginalFlightList(data?.data?.flights);
				setFirstLoading(false);
				updateFlightResultsLoading(false);
				updateIsURLModified(false);
				updateLoading(false);
			});
		if (!airlines || airlines?.length == 0) {
			setIsMultipleAirlineFilter(false);
		} else {
			// if (airlines?.length > 0)
			setIsMultipleAirlineFilter(true);
			const airlineNewtonIDs = [];
			airlines.forEach((ele) =>
				airlineNewtonIDs.push(ICON_SOURCES[ele].newtonID)
			);
			console.log(airlineNewtonIDs, flightDataArray);
			const filteredFlightDataArray = [];
			flightDataArray.forEach((ele) => {
				if (airlineNewtonIDs.includes(ele.airline)) {
					filteredFlightDataArray.push(ele);
				}
			});
			setFlightListModified(filteredFlightDataArray);
		}
	}

	// useEffect(() => {
	// 	// flightSearchResultFetch();
	// 	flightSearchResultFetchNew();
	// 	// flightSearchResultFetch();
	// }, []);
	useEffect(() => {
		flightSearchResultFetchNew();
		// flightSearchResultFetch();
	}, [sortOptions, filterOptions]);
	// }, []);

	/* 	useEffect(() => {
		if (!hasApiFetched) {
			return;
		}
		// `/flights/search?src=${source.iata_code}
		// &dest=${destination.iata_code}
		// &day=${routerDay}
		// &notv=${numberOfPassengers}`;

		// console.table("searchParams in FLLLLL", router);
		// const newQueryParams = {
		// 	day: "22-05-2024",
		// };
		// setTimeout(() => {
		// 	router.push(
		// 		{
		// 			pathname: router.pathname,
		// 			query: {
		// 				...router.query,
		// 				...newQueryParams,
		// 			},
		// 		},
		// 		undefined,
		// 		{ shallow: true }
		// 	);
		// }, 5000);
	}, [hasApiFetched]); */
	return (
		<div id="flight-result-list">
			{!isMultipleAirlineFilter && flightListOriginal.length == 0 && (
				<div
					className="single-flight-data-container"
					style={{ textAlign: "center" }}
				>
					Sorry, No flights available for the selected filters.
				</div>
			)}
			{!isMultipleAirlineFilter &&
				flightListOriginal?.map((ele) => {
					return (
						<AllTheCards
							ele={ele}
							source={source}
							destination={destination}
							numberOfPassengers={numberOfPassengers}
							key={ele._id}
						/>
					);
				})}
			{isMultipleAirlineFilter && flightListModified.length == 0 && (
				<div
					className="single-flight-data-container"
					style={{ textAlign: "center" }}
				>
					Sorry, No flights available for the selected filters.
				</div>
			)}
			{isMultipleAirlineFilter &&
				flightListModified?.map((ele) => {
					return (
						<AllTheCards
							ele={ele}
							source={source}
							destination={destination}
							numberOfPassengers={numberOfPassengers}
							key={ele._id}
						/>
					);
				})}
		</div>
	);
}

function AllTheCards({ ele, source, destination, numberOfPassengers }) {
	const [showFlightDetails, setShowFlightDetails] = useState(false);
	const a = 10;
	const flightIDSplit = ele.flightID.split("-");
	const carrierID = flightIDSplit[0];
	const flightNumber = flightIDSplit[2];
	const fullFlightName = ICON_SOURCES[carrierID].shortID + "-" + flightNumber;
	// console.log(
	// 	"FLIGHTID SPLIT",
	// 	flightIDSplit,
	// 	carrierID,
	// 	flightNumber,
	// 	fullFlightName
	// );
	function handleSetShowFlightDetails() {
		setShowFlightDetails((prev) => !prev);
	}
	return (
		<>
			{
				<div className="single-flight-data-container" key={ele._id}>
					<div className="top-content">
						<div className="flight-logo-name flex-center-center">
							<div className="flight-logo-container">
								<img src={ICON_SOURCES[carrierID].icon.src} />
							</div>
							<div className="flight-text-container">
								<h3>{ICON_SOURCES[carrierID].name}</h3>
								<p>{fullFlightName}</p>
							</div>
						</div>

						<div className="departure-time ">
							<h3>{ele.departureTime}</h3>
							<p>{source.city}</p>
						</div>
						<div className="flight-duration-stops flex-center-center">
							<p
								className={
									ele.stops == 0
										? "fastest"
										: ele.stops == 1
										? "medium"
										: "hard"
								}
							>
								{ele.duration + "h 00m"}
							</p>
							<div className="arrow-right-direction"></div>
							<p className="flight-stops">
								{ele.stops == 0
									? "Nonstop"
									: ele.stops == 1
									? `1-stop`
									: `${ele.stops}-stops`}
							</p>
						</div>
						<div className="arrival-time">
							<h3>{ele.arrivalTime}</h3>
							<p>{destination.city}</p>
						</div>
						<div className="flight-price ">
							<div>
								<CurrencyRupeeIcon />
								{ele.ticketPrice * numberOfPassengers}
							</div>
							<p>
								{numberOfPassengers == 1
									? `${numberOfPassengers} adult`
									: `${numberOfPassengers} adults`}
							</p>
						</div>
						<div className="flight-book-seats">
							<BookNowButton
								sourceCity={source.city}
								destinationCity={destination.city}
								f_id={ele._id}
							/>
							<div
								className={
									ele.availableSeats >= 10
										? "seats-remaining"
										: "seats-remaining low-seats-left"
								}
							>
								<AirlineSeatLegroomNormalIcon />
								<p>
									{ele.availableSeats > 10
										? ele.availableSeats
										: `${ele.availableSeats} Seats left`}
								</p>
							</div>
						</div>
						{/* <p key={ele._id}>{ele.flightID}</p> */}
					</div>
					<div
						className="bottom-content"
						onClick={handleSetShowFlightDetails}
					>
						<p>
							{showFlightDetails
								? "Hide Details"
								: "Flight Details"}
						</p>
					</div>
					{showFlightDetails && (
						<SingleFlightDetailsMain
							key={ele._id + "FD"}
							flightID={ele._id}
							handleSetShowFlightDetails={
								handleSetShowFlightDetails
							}
							flightIcon={ICON_SOURCES[carrierID].icon.src}
							carrierName={ICON_SOURCES[carrierID].name}
							fullFlightName={fullFlightName}
						/>
					)}
				</div>
			}
		</>
	);
}

function BookNowButton({ sourceCity, destinationCity, f_id }) {
	const router = useRouter();
	function handleClick() {
		localStorage.removeItem("citiesData");
		const citiesData = {
			sourceCity,
			destinationCity,
		};
		localStorage.setItem("citiesData", JSON.stringify(citiesData));
		router.push(`/flights/review?id=${f_id}`);
	}
	return (
		<button className="flight-booking-button" onClick={handleClick}>
			Book Now
		</button>
	);
}
