import { FlightSearchProvider } from "@/contexts/FlightSearchContext";

export default function FlightTwoLayout({ children }) {
	return <FlightSearchProvider>{children}</FlightSearchProvider>;
}
