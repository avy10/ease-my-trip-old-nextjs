import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { useRouter } from "next/router";
import { useState } from "react";

export default function StopsFilter() {
	const router = useRouter();
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { updateFilterOptions } = flightSearchModificationCS;
	const [stopsValueSelected, setStopsValueSelected] = useState([10, 11, 12]);
	const [showWarning, setShowWarning] = useState(false);
	function applyStopsFilter(condition, valueLow, valueHigh) {
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
		let newFilter;
		if (condition == "allStops") {
			newFilter = {
				...filterOldDecoded,
			};

			delete newFilter.stops;
		} else if (condition == "singleStop") {
			newFilter = {
				...filterOldDecoded,
				stops: valueLow,
			};
		} else if (condition == "dualStops") {
			newFilter = {
				...filterOldDecoded,
				stops: {
					$lte: valueHigh,
					$gte: valueLow,
				},
			};
		}
		const stringifiedFilterValue = JSON.stringify(newFilter);
		const encodedFilters = encodeURIComponent(stringifiedFilterValue);
		updateFilterOptions(newFilter);
		router.replace(
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
	}
	function updateStopsValueSelected(index) {
		const indexNum = Number(index);
		const sum =
			stopsValueSelected[0] +
			stopsValueSelected[1] +
			stopsValueSelected[2];

		if (sum <= -9 && stopsValueSelected[indexNum] > 0) {
			// alert("AA");
			setShowWarning(true);
			return;
		} else {
			setShowWarning(false);
		}
		const newArr = [...stopsValueSelected];
		// console.log("indexNum", indexNum);
		// console.log(stopsValueSelected);
		// console.log("RRRRRRRRRRRUUUUUUUUUUUUUUNNNNNNNNNNNNNNNNNN");
		// console.log(newArr[indexNum]);
		newArr[indexNum] = -1 * newArr[indexNum];
		setStopsValueSelected(newArr);
		// console.log(newArr);
		if (newArr[0] > 0 && newArr[1] > 0 && newArr[2] > 0) {
			applyStopsFilter("allStops");
		} else if (newArr[0] > 0 && newArr[1] < 0 && newArr[2] < 0) {
			applyStopsFilter("singleStop", 0);
		} else if (newArr[1] > 0 && newArr[0] < 0 && newArr[2] < 0) {
			applyStopsFilter("singleStop", 1);
		} else if (newArr[2] > 0 && newArr[0] < 0 && newArr[1] < 0) {
			applyStopsFilter("singleStop", 2);
		} else if (newArr[0] > 0 && newArr[1] > 0 && newArr[2] < 0) {
			applyStopsFilter("dualStops", 0, 1);
		} else if (newArr[0] > 0 && newArr[2] > 0 && newArr[1] < 0) {
			// applyStopsFilter("dualStops", 0, 2);
			// applyStopsFilter("allStops");
		} else if (newArr[1] > 0 && newArr[2] > 0 && newArr[0] < 0) {
			applyStopsFilter("dualStops", 1, 2);
		}
	}
	return (
		<>
			<p className="filter-box-name">
				Stops
				{showWarning && <span>(at least one filter is required)</span>}
			</p>
			<div className="stops-filter-box">
				{["0", "1", "2+"].map((ele, index) => (
					<div
						className={`single-stop-box flex-center-center ${
							stopsValueSelected[index] > 0 ? "unselected" : ""
						}`}
						key={index}
						onClick={() => {
							updateStopsValueSelected(index);
						}}
					>
						<p>{ele}</p>
						{/* <p>{stopsValueSelected[index]}</p> */}
						<p>
							{ele === "0"
								? "NonStop"
								: ele === "1"
								? "Stop"
								: "Stops"}
						</p>
					</div>
				))}
			</div>
		</>
	);
}
