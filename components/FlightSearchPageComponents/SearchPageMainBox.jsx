import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import FilterBox from "./SearchResultsPage/FilterBox";
import FlightsList from "./SearchResultsPage/FlightsList";
export default function SearchMainBox({ paramsAreLoaded }) {
	const searchData = useContext(FlightSearchContext);
	const { isTwoWay } = searchData;

	return (
		<div className="search-results-main-div">
			<FilterBox />
			{!isTwoWay && (
				<>
					<FlightsList paramsAreLoaded={paramsAreLoaded} />
					<div className="fsp-main-content-box">I AM ON ONE WAY</div>
				</>
			)}
			{isTwoWay && (
				<div className="fsp-main-content-box">I AM ON TWO WAY</div>
			)}
		</div>
	);
}
// flights / search;
