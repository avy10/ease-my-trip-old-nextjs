import FlightHome from "@/components/Flights/FlightsHome";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";
import App from "@/pages/flights/_app";
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
