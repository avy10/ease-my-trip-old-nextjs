import FlightHome from "@/components/Flights/FlightsHome";
import Home from "@/pages/flights/index";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";
export default function App({ Component, pageProps }) {
	return (
		<FlightSearchProvider>
			<>
				{/* <Home /> */}
				<Component {...pageProps} />
			</>
		</FlightSearchProvider>
	);
}
