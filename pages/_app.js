import Navigation from "@/components/Navigation";
import { AuthorisationProvider } from "@/contexts/AuthorisationContext";
import "@/styles/globals.css";

import "@/styles/commons/navigationStyling.css";

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
