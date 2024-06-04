import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { useRouter } from "next/router";

import DateCard from "./DateCard";
import OneWayQuickButtons from "./OneWayQuickButtons";
import SearchResultsOfferCards from "./SearchResultsOfferCards";
import SortButtons from "./SortButtons";

export default function OneWayTopBar({ updateFlightResultsLoading }) {
	const router = useRouter();
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { sortOptions, updateSortOptions } = flightSearchModificationCS;

	function sortAirlines(sortingValue) {
		updateFlightResultsLoading(true);
		const { src, dest, day, notv, sort, filter } = router.query;
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
		// console.log("MODIFIED", requiredObjects);
		const sortParamsNew = JSON.parse(decodeURIComponent(sort));
		// console.log("sortParamsNew", sortParamsNew);

		const stringifiedSortingValue = JSON.stringify(sortingValue);
		// const encodedAirlineAscendingSort =
		// 	encodeURIComponent(airlineAscendingSort);
		const encodedAirlineAscendingSort = encodeURIComponent(
			stringifiedSortingValue
		);

		router.replace(
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
	}
	function changeDate(dateValue) {}
	return (
		<div className="one-way-top-bar">
			<OneWayQuickButtons sortAirlines={sortAirlines} />
			<SearchResultsOfferCards />
			<DateCard />
			<SortButtons sortAirlines={sortAirlines} />
		</div>
	);
}
