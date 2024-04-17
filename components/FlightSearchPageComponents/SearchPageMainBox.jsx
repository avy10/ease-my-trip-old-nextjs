import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
export default function SearchMainBox() {
	const searchData = useContext(FlightSearchContext);
	const { isTwoWay } = searchData;

	return (
		<div>
			{!isTwoWay && (
				<div className="fsp-main-content-box">I AM ON ONE WAY</div>
			)}
			{isTwoWay && (
				<div className="fsp-main-content-box">I AM ON TWO WAY</div>
			)}
		</div>
	);
}
// flights / search;
