import FspSearchBox from "@/components/FlightSearchPageComponents/FspSearchBox";
import SearchMainBox from "@/components/FlightSearchPageComponents/SearchPageMainBox";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";

export default function FlightSearchHome() {
	return (
		<FlightSearchProvider>
			<div className="flight-search-home">
				<FspSearchBox />
				<SearchMainBox />
			</div>
		</FlightSearchProvider>
	);
}
