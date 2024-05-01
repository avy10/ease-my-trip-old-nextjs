import FlightHome from "@/components/Flights/FlightsHome";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";
export default function Home() {
	/* return (
		<App>
			<>
				<FlightHome />
			</>
		</App>
	); */

	return (
		<FlightSearchProvider>
			<>
				<FlightHome />
			</>
		</FlightSearchProvider>
	);
}
