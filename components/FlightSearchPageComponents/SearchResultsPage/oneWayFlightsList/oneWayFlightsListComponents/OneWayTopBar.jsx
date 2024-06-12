import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { useRouter } from "next/router";

import DateCard from "./DateCard";
import OneWayQuickButtons from "./OneWayQuickButtons";
import SearchResultsOfferCards from "./SearchResultsOfferCards";
import SortButtons from "./SortButtons";

export default function OneWayTopBar({
	updateFlightResultsLoading,
	searchButtonOnclickStateReset,
}) {
	const router = useRouter();
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { sortOptions, updateSortOptions } = flightSearchModificationCS;

	async function sortAirlines(sortingValue) {
		updateFlightResultsLoading(true);
		const { src, dest, day, notv, sort, filter, airlines } = router.query;
		// // const sortParams = searchParams.get("sort");
		const a = JSON.parse(decodeURIComponent(sort));
		const obj = { ...router.query, sort: a };
		// const newParamsObj = { ...router.query, sort: JSON.stringify(a) };
		// const encodedNewParamsObj = encodeURIComponent(newParamsObj);
		// console.log("MODIFIED", obj);
		// router.push(
		// 	{
		// 		pathname: router.pathname,
		// 		query: {
		// 			...encodedNewParamsObj,
		// 		},
		// 	},
		// 	undefined,
		// 	{ shallow: true }
		// );

		const requiredObjects = {
			src,
			dest,
			day,
			notv,
		};
		let filterOldDecoded;
		if (filter) {
			filterOldDecoded = JSON.parse(decodeURIComponent(filter));
		}
		if (airlines) {
			requiredObjects.airlines = airlines;
		}

		if (filterOldDecoded != null || filterOldDecoded != undefined) {
			console.log(
				"ONE WAY TOP BAR",
				Object.keys(filterOldDecoded),
				"\n",
				filterOldDecoded
			);
			if (Object.keys(filterOldDecoded).length == 0) {
				// do nothing
			} else {
				requiredObjects.filter = filter;
				console.log(
					"REQUIRED OBJECTS IN ONE WAY TOP BAR",
					requiredObjects
				);
			}
		}
		// console.log("MODIFIED", requiredObjects);
		const sortParamsNew = JSON.parse(decodeURIComponent(sort));
		// console.log("sortParamsNew", sortParamsNew);

		const stringifiedSortingValue = JSON.stringify(sortingValue);
		// const encodedAirlineAscendingSort =
		// 	encodeURIComponent(airlineAscendingSort);
		const encodedAirlineAscendingSort = encodeURIComponent(
			stringifiedSortingValue
		);

		await router.replace(
			{
				pathname: router.pathname,
				query: {
					...requiredObjects,
					sort: encodedAirlineAscendingSort,
				},
			},
			undefined,
			{ shallow: true }
		);
		updateSortOptions(sortingValue);
		// searchButtonOnclickStateReset();
		updateFlightResultsLoading(false);
	}
	function changeDate(dateValue) {}
	return (
		<div className="one-way-top-bar">
			<OneWayQuickButtons
				searchButtonOnclickStateReset={searchButtonOnclickStateReset}
				sortAirlines={sortAirlines}
			/>
			<SearchResultsOfferCards />
			<DateCard
				searchButtonOnclickStateReset={searchButtonOnclickStateReset}
			/>
			<SortButtons sortAirlines={sortAirlines} />
		</div>
	);
}
