import RadioButtons from "@/components/Flights/Search/RadioButtons";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";

export default function FlightSearchHome() {
	return (
		<FlightSearchProvider>
			<div className="flight-search-home">
				<div className="flight-search-radio-buttons">
					<RadioButtons />
				</div>
			</div>
		</FlightSearchProvider>
	);
}
