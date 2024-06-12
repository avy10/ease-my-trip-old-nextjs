import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { ICON_SOURCES } from "@/public/utils/FlightUtils/airlineDecoding";
import { useRouter } from "next/router";
import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";

export default function AirlineFilterBox() {
	const [airlineCodes] = useState([
		"6E001",
		"AI001",
		"UK001",
		"SG001",
		"G801",
	]);
	const router = useRouter();
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { filterOptions, updateFilterOptions } = flightSearchModificationCS;
	// airline;
	const [selectedAirlines, setSelectedAirlines] = useState([...airlineCodes]);
	const [allSelection, setAllSelection] = useState(true);

	function toggleAllSelection(event) {
		setAllSelection(event.target.checked);
		setSelectedAirlines([...airlineCodes]);
		if (event.target.checked) {
			routingMultipleAirlines([], true);
			// the purpose of this call is to delete the list of airlines, when all the airlines are selected there is no need to filter
		}
	}
	async function routingForOnlySelection(airlineValue) {
		// const airlineCode = airlineValue;
		const airlineID = ICON_SOURCES[airlineValue].newtonID;
		// console.log(airlineID);
		const { src, dest, day, notv, sort, filter } = router.query;
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
		const newFilter = {
			...filterOldDecoded,
			airline: airlineID,
		};
		const stringifiedFilterValue = JSON.stringify(newFilter);
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
	async function routingMultipleAirlines(
		airlineArray,
		allAirlineSelected = false
	) {
		const { src, dest, day, notv, sort, filter, airlines } = router.query;
		const requiredObjects = {
			src,
			dest,
			day,
			notv,
			sort,
		};
		console.log("AIRLINE ARRAY", airlineArray);
		console.log("airlines", airlines);
		let filterOldDecoded;
		if (filter) {
			filterOldDecoded = JSON.parse(decodeURIComponent(filter));
		}
		const newFilter = {
			...filterOldDecoded,
		};
		if (newFilter.airline) {
			delete newFilter.airline;
		}
		if (allAirlineSelected) {
			if (airlines) {
				delete newFilter.airlines;
			}
		} else {
			const stringiFiedAirlineArray = JSON.stringify(airlineArray);
			const encodedAirlineArray = encodeURIComponent(
				stringiFiedAirlineArray
			);
			requiredObjects.airlines = airlineArray;
			console.log(airlineArray);
		}
		const stringifiedFilterValue = JSON.stringify(newFilter);
		const encodedFilters = encodeURIComponent(stringifiedFilterValue);
		console.log("requiredObjects", requiredObjects);
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
	let key;
	function updateSelectedAirlines(event, airlineValue, isOnly = false) {
		if (isOnly) {
			clearTimeout(key);
			key = setTimeout(() => {
				setAllSelection(false);
				setSelectedAirlines([airlineValue]);
				routingForOnlySelection(airlineValue);
			}, 750);
		} else {
			let newArray;
			if (event?.target?.checked) {
				console.log("I AM PUSHING INTO ARRAY");
				newArray = [...selectedAirlines, airlineValue];
			} else {
				console.log("I AM REMOVING FROM ARRAY");
				newArray = selectedAirlines.filter(
					(element) => element != airlineValue
				);
			}
			setSelectedAirlines(newArray);
			routingMultipleAirlines(newArray);
		}
	}
	useEffect(() => {
		if (selectedAirlines.length < 5) {
			setAllSelection(false);
		} else if (selectedAirlines.length == 5) {
			if (allSelection) {
				// console.log(
				// 	"I AM ACTUALLY RETURNING WHEN ALL SELECTION IS ",
				// 	allSelection
				// );
				return;
			}
			setAllSelection(true);
			routingMultipleAirlines([], true);
			// the purpose of this call is to delete the list of airlines, when all the airlines are selected there is no need to filter
		}
	}, [selectedAirlines]);
	useEffect(() => {
		const { airlines } = router.query;
		if (airlines) {
			setAllSelection(false);
			setSelectedAirlines([...airlines]);
		}
	}, []);
	return (
		<div className="airline-name-filter-box">
			<p className="filter-box-name">Airlines</p>
			<div className="airline-names">
				<ul>
					<li>
						<Checkbox
							inputProps={{
								"aria-label": `ALL AIRLINES`,
							}}
							sx={{
								color: "#2196F3",
								"&.Mui-checked": {
									color: "#2196F3",
								},
								"& .MuiSvgIcon-root": { fontSize: 20 },
							}}
							checked={allSelection}
							onChange={toggleAllSelection}
						/>
						<span>ALL AIRLINES</span>
					</li>
					{airlineCodes.map((ele, index) => (
						<AirlineList
							key={index}
							ele={ele}
							selectedAirlines={selectedAirlines}
							updateSelectedAirlines={updateSelectedAirlines}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

function AirlineList({ ele, selectedAirlines, updateSelectedAirlines }) {
	const [showOnly, setShowOnly] = useState(false);
	return (
		<li
			onMouseEnter={() => setShowOnly(true)}
			onMouseLeave={() => setShowOnly(false)}
		>
			<Checkbox
				inputProps={{ "aria-label": `${ICON_SOURCES[ele].name}` }}
				sx={{
					color: "#2196F3",
					"&.Mui-checked": {
						color: "#2196F3",
					},
					"& .MuiSvgIcon-root": { fontSize: 20 },
				}}
				checked={selectedAirlines.includes(ele)}
				onChange={(event) => updateSelectedAirlines(event, ele)}
			/>
			<div className="icon-box">
				<img src={ICON_SOURCES[ele].icon.src} />
			</div>
			<div className="airline-name">
				<p>{ICON_SOURCES[ele].name}</p>
			</div>
			{showOnly && (
				<div
					className="only-button"
					onClick={() => {
						updateSelectedAirlines(event, ele, true);
					}}
				>
					only
				</div>
			)}
		</li>
	);
}
