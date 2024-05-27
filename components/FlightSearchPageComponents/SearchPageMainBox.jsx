import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import FilterBox from "./SearchResultsPage/FilterBox";
import OneWay from "./SearchResultsPage/oneWayFlightsList/OneWay";
export default function SearchMainBox({
	updateLoading,
	paramsAreLoaded,
	sortParamsState,
	searchButtonOnclickStateReset,
	updateSortParamsState,
}) {
	const searchData = useContext(FlightSearchContext);
	const { isTwoWay } = searchData;

	if (!paramsAreLoaded) return null;
	return (
		<div className="search-results-main-div">
			{!isTwoWay && (
				<OneWay
					updateLoading={updateLoading}
					sortParamsState={sortParamsState}
					updateSortParamsState={updateSortParamsState}
				/>
			)}
			{isTwoWay && (
				<div className="fsp-main-content-box">I AM ON TWO WAY</div>
			)}
		</div>
	);
}
// flights / search;
