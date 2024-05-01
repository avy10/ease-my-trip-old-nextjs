import FlightSearchContext from "@/contexts/FlightSearchContext";
import { useContext } from "react";
// import Link from "next/link";

import { useRouter } from "next/router";

export default function FlightHomeTwo() {
	const searchData = useContext(FlightSearchContext);
	const { source, destination, updateFlightSearchStates } = searchData;
	const router = useRouter();
	return (
		<div style={{ position: "relative", top: "9.5vh" }}>
			I am on homepage of FlightTwo
			<p> Source : {source.iata_code ? source.iata_code : source} </p>
			<button
				onClick={() => updateFlightSearchStates("source", "Abhishek")}
			>
				Change Source
			</button>
			{/* <Link href="flightsTwo/searchTwo" state={{ lead: 123 }}>
				Go to search Page
			</Link> */}
			<button
				onClick={() =>
					router.push({
						pathname: "flightsTwo/searchTwo",
						query: { lead: 123 },
					})
				}
			>
				Go to search Pages
			</button>
		</div>
	);
}
