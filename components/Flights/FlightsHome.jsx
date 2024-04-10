import React from "react";
import SearchBox from "./SearchBox";
import ExclusiveOffers from "./ExclusiveOffers/ExclusiveOffers";
import Refund from "./Refund/Refund";
import TopFlightRoutes from "./topFlightRoutes/TopFlightRoutes";
import WhyUs from "./bottomHalf/WhyUs";
import About from "./bottomHalf/About";

export default function FlightHome() {
	return (
		<div className="flight-home-container">
			<SearchBox />
			<ExclusiveOffers />
			<Refund />
			<TopFlightRoutes />
			<WhyUs />
			<About />
			{/* <FlightFooter /> */}
		</div>
	);
}
