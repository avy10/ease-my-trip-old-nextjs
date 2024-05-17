import Divider from "@mui/material/Divider";
import { airlineCodes } from "@/public/utils/FlightUtils/airlineDecoding";
import { useState } from "react";
import AirlinesIcon from "@mui/icons-material/Airlines";

import AirlineFilterBox from "./oneWayFilterBox/AirlineFilterBox";
import RangeSlider from "./oneWayFilterBox/RangeSlider";
import StopsFilter from "./oneWayFilterBox/StopsFilterBox";
import DepartureArrivalTimeFilter from "./oneWayFilterBox/DepartureArrivalTimeFilter";
// RANGE SLIDER .JSX

export default function FilterBox() {
	return (
		<div className="flights-filter-box">
			<h3>FILTER</h3>
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>
			<AirlineFilterBox />
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">Price Range</p>
			<RangeSlider />
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">Stops</p>
			<StopsFilter />
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">Departure from Delhi</p>
			<DepartureArrivalTimeFilter />
			<Divider
				sx={{
					backgroundColor: "cecece",
				}}
			/>

			<p className="filter-box-name">Arrival at Mumbai</p>
			<DepartureArrivalTimeFilter />
		</div>
	);
}
