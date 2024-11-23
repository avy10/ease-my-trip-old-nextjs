import Navigation from "@/components/Navigation/Navigation";
import { AuthorisationProvider } from "@/contexts/AuthorisationContext";
import "@/styles/globals.css";
import "@/styles/fonts.css";

import "@/styles/commons/navigationStyling.css";

// CSS FOR "pages/flights/index.jsx"
import "@/styles/flights/flightsHome.css";
import "@/styles/flights/searchBox.css";
// import "@/styles/flights/mainBoxTwo.css";
// import "@/styles/flights/exclusiveOffers.css";
// import "@/styles/flights/offerCard.css";
import "@/styles/flights/refund.css";
import "@/styles/flights/topFlightDivs.css";
import "@/styles/flights/whyus.css";
import "@/styles/flights/aboutHome.css";
import "@/styles/flights/review/reviewHome.css";
import "@/styles/flights/flightFooter.css";
import "@/styles/flightSearch/flightSearchHome.css";
import "@/styles/flightSearch/fspInputFields.css";
import "@/styles/flightSearch/searchPageMainBox.css";
import "@/styles/flightSearch/filterBox.css";
import "@/styles/flightSearch/oneWayStyles/oneWayStylesMain.css";
import "@/styles/flightSearch/oneWayStyles/dateCard.css";
import "@/styles/flightSearch/oneWayStyles/sortButtons.css";
import "@/styles/flightSearch/oneWayStyles/flightsList.css";
import "@/styles/flightSearch/oneWayStyles/singleFlightDetails/singleFlightDetailsMain.css";

import "@/styles/flightSearch/quickButtonsFL.css";
import "@/styles/flightSearch/searchResultsOfferCards.css";

// import "@/styles/responsiveness/mobile-flight-pages.css";
import "@/styles/flights/review/flightReview.css";
import "@/styles/flights/review/reviewHome.css";
import "@/styles/hotels/hotelSearch/hotelSearchHome.css";
import "@/styles/hotels/hotelSearch/hotelSearchHotelList.css";
import "@/styles/hotels/hotelData.css";
import Footer from "@/components/Custom-User-Components/Footer";

// vercel speed insights
import { SpeedInsights } from "@vercel/speed-insights/next";
import { HotelSearchProvider } from "@/contexts/HotelSearchContext";
export default function App({ Component, pageProps }) {
	return (
		<AuthorisationProvider>
			<HotelSearchProvider>
				<>
					<Navigation />
					<Component {...pageProps} />
					<SpeedInsights />
					<Footer />
				</>
			</HotelSearchProvider>
		</AuthorisationProvider>
	);
}
