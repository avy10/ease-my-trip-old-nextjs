import Navigation from "@/components/Navigation";
import { AuthorisationProvider } from "@/contexts/AuthorisationContext";
import "@/styles/globals.css";

import "@/styles/commons/navigationStyling.css";

import "@/styles/flights/flightsHome.css";
import "@/styles/fonts.css";
import "@/styles/flights/exclusiveOffers.css";
import "@/styles/flights/offerCard.css";
import "@/styles/flights/refund.css";
import "@/styles/flights/topFlightDivs.css";
import "@/styles/flights/whyus.css";
import "@/styles/flights/aboutHome.css";
import "@/styles/flights/flightFooter.css";
export default function App({ Component, pageProps }) {
	return (
		<AuthorisationProvider>
			<>
				<Navigation />
				<Component {...pageProps} />
			</>
		</AuthorisationProvider>
	);
}
