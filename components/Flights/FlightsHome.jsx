import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import ExclusiveOffers from "./ExclusiveOffers/ExclusiveOffers";

export default function FlightHome() {
	return (
		<div className="flightHomeContainer">
			<SearchBox />
			<ExclusiveOffers />
		</div>
	);
}
