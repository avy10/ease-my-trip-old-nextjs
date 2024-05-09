import Navigation from "@/components/Navigation";
import { AuthorisationProvider } from "@/contexts/AuthorisationContext";
import "@/styles/globals.css";
import "@/styles/fonts.css";

import "@/styles/commons/navigationStyling.css";

// CSS FOR "pages/flights/index.jsx"
import "@/styles/flights/flightsHome.css";
import "@/styles/flights/searchBox.css";
import "@/styles/flights/mainBoxTwo.css";
import "@/styles/flights/exclusiveOffers.css";
import "@/styles/flights/offerCard.css";
import "@/styles/flights/refund.css";
import "@/styles/flights/topFlightDivs.css";
import "@/styles/flights/whyus.css";
import "@/styles/flights/aboutHome.css";
import "@/styles/flights/flightFooter.css";
import "@/styles/flightSearch/flightSearchHome.css";
import "@/styles/flightSearch/fspInputFields.css";
import "@/styles/flightSearch/searchPageMainBox.css";
import "@/styles/flightSearch/filterBox.css";
import "@/styles/flightSearch/oneWayStyles/oneWayStylesMain.css";
import "@/styles/flightSearch/oneWayStyles/dateCard.css";
import "@/styles/flightSearch/oneWayStyles/sortButtons.css";
import "@/styles/flightSearch/oneWayStyles/flightsList.css";

import "@/styles/flightSearch/quickButtonsFL.css";
import "@/styles/flightSearch/searchResultsOfferCards.css";
import Footer from "@/components/Footer";

// vercel speed insights
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function App({ Component, pageProps }) {
	return (
		<AuthorisationProvider>
			<>
				<Navigation />
				<Component {...pageProps} />
				<Footer />
				<SpeedInsights />
			</>
		</AuthorisationProvider>
	);
}
