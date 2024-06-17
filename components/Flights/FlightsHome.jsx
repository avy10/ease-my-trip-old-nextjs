import React from "react";
import SearchBox from "./SearchBox";
import ExclusiveOffers from "./ExclusiveOffers/ExclusiveOffers";
import Refund from "./Refund/Refund";
import TopFlightRoutes from "./topFlightRoutes/TopFlightRoutes";
import WhyUs from "./bottomHalf/WhyUs";
import About from "./bottomHalf/About";
import InfoBoxes from "./InfoBoxes";
import FamousTouristAttraction from "./FamousTouristAttractions";
import TravelBlogs from "./TravelBlogs";
import FlightBookingParagraph from "./FlightBookingParagraph";

export default function FlightHome() {
	return (
		<div className="flight-home-container">
			<SearchBox />
			<ExclusiveOffers />
			{/* <Refund /> */}
			{/* <TopFlightRoutes /> */}
			{/* <InfoBoxes /> */}
			{/* <FamousTouristAttraction /> */}
			{/* <TravelBlogs /> */}
			{/* <WhyUs /> */}
			<About />
			<FlightBookingParagraph />
			{/* <FlightFooter /> */}
		</div>
	);
}
