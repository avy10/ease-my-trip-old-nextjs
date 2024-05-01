import FlightSearchContext from "@/contexts/FlightSearchContext";
import { useContext } from "react";
export default function FlightTwoSearchPage() {
	const searchData = useContext(FlightSearchContext);
	const { source, destination, updateFlightSearchStates } = searchData;
	return (
		<div style={{ position: "relative", top: "9.5vh" }}>
			I am on Search Page of FlightTwo
			<p> Source : {source.iata_code ? source.iata_code : source} </p>
			<button
				onClick={() =>
					updateFlightSearchStates("source", "We are Searching")
				}
			>
				Change Source
			</button>
		</div>
	);
}
