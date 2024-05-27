import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import FspSearchBox from "@/components/FlightSearchPageComponents/FspSearchBox";
import SearchMainBox from "@/components/FlightSearchPageComponents/SearchPageMainBox";
import FlightSearchContext, {
	FlightSearchProvider,
} from "@/contexts/FlightSearchContext";
import { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SearchPageParentBuild from "@/components/FlightSearchPageComponents/SearchPageParentBuild";
import Loader from "@/components/FlightSearchPageComponents/Loader";
import SearchResultsModificationContextProvider from "@/contexts/SearchResultsModificationContext";
export default function FlightSearchHome() {
	// const fsd = useContext(FlightSearchContext);
	// const { source, airportNames } = fsd;
	const router = useRouter();
	const searchParams = useSearchParams();
	const [errorInParams, setErrorInParams] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(true);
	// material UI state and function for backdrops
	const [unMountSPPB, setUnMountSPPB] = useState(false);
	//
	useEffect(() => {
		setUnMountSPPB(false);
	}, [unMountSPPB]);

	useEffect(() => {
		const handlePopState = () => {
			// Force a re-render by toggling unMountSPPB state
			setUnMountSPPB(true);
			// when the search pages is loaded, it fetches the states from URL and updates the states in FlightSearchContext
			// whenever the search button on the flight search page is clicked, I do not want the page to reload in order for it to fetch the newer parameters from the URL
			// instead I am using this boolean state to unmount and remount the component
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	function updateLoading(val) {
		setLoading(val);
	}

	return (
		<FlightSearchProvider>
			{loading && <Loader />}

			{!unMountSPPB && (
				<SearchResultsModificationContextProvider>
					<SearchPageParentBuild
						updateLoading={updateLoading}
						setUnMountSPPB={setUnMountSPPB}
					/>
				</SearchResultsModificationContextProvider>
			)}
		</FlightSearchProvider>
	);
}
