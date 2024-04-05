import React from "react";

import PreInfo from "./Search/PreInfo";
import MainBox from "./Search/MainBox";
export default function SearchBox() {
	return (
		<div className="flight-search-box">
			<div className="inner-box">
				<PreInfo />
				<MainBox />
			</div>
		</div>
	);
}
