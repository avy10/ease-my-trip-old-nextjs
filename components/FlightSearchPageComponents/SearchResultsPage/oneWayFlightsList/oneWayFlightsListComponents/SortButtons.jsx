// css : styles\flightSearch\oneWayStyles\sortButtons.css

import { useRouter } from "next/router";

export default function SortButtons({
	searchButtonOnclickStateReset,
	setSortParamsState,
}) {
	const router = useRouter();

	function sortAirlinesAsc() {
		console.log(router.query);
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
		console.log("MODIFIED", requiredObjects);
		const sortParamsNew = JSON.parse(decodeURIComponent(sort));
		console.log("sortParamsNew", sortParamsNew);

		const airlineAscendingSort = { airline: 1 };
		const stringifiedAirlineAscendingSort =
			JSON.stringify(airlineAscendingSort);
		// const encodedAirlineAscendingSort =
		// 	encodeURIComponent(airlineAscendingSort);
		const encodedAirlineAscendingSort = encodeURIComponent(
			stringifiedAirlineAscendingSort
		);

		router.push(
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
		setSortParamsState(airlineAscendingSort);
		// searchButtonOnclickStateReset();
	}
	return (
		<div className="sort-options-flight-search">
			<p onClick={sortAirlinesAsc}>AIRLINES</p>
			<p>ARRIVAL</p>
			<p>DEPARTURE</p>
			<p>DURATION</p>
			<p>PRICE</p>
		</div>
	);
}
