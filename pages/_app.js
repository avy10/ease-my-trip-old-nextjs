import Navigation from "@/components/Navigation";
import { AuthorisationProvider } from "@/contexts/AuthorisationContext";
import "@/styles/globals.css";

import "@/styles/commons/navigationStyling.css";

import "@/styles/flights/flightsHome.css";
import "@/styles/fonts.css";
import "@/styles/flights/exclusiveOffers.css";

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
