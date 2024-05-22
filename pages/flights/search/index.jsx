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
export default function FlightSearchHome() {
	// const fsd = useContext(FlightSearchContext);
	// const { source, airportNames } = fsd;
	const router = useRouter();
	const searchParams = useSearchParams();
	const [errorInParams, setErrorInParams] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(true);
	// material UI state and function for backdrops
	const [open, setOpen] = useState(true);
	const [unMountSPPB, setUnMountSPPB] = useState(false);
	//
	useEffect(() => {
		setUnMountSPPB(false);
	}, [unMountSPPB]);

	useEffect(() => {
		const handlePopState = () => {
			// Force a re-render by toggling unMountSPPB state
			setUnMountSPPB(true);
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	return (
		<FlightSearchProvider>
			{loading && (
				<Backdrop
					sx={{
						color: "aqua",
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={open}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{!unMountSPPB && (
				<SearchPageParentBuild
					loading={loading}
					setLoading={setLoading}
					setUnMountSPPB={setUnMountSPPB}
				/>
			)}
		</FlightSearchProvider>
	);
}
