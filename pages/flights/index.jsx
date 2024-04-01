import FlightHome from "@/components/Flights/FlightsHome";
// import FlightHome from "../components/FlightHome3";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";

export default function Home() {
	return (
		<FlightSearchProvider>
			<>
				<FlightHome />
			</>
		</FlightSearchProvider>
	);
}
