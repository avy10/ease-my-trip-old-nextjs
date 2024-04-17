import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import FspSearchBox from "@/components/FlightSearchPageComponents/FspSearchBox";
import SearchMainBox from "@/components/FlightSearchPageComponents/SearchPageMainBox";
import { FlightSearchProvider } from "@/contexts/FlightSearchContext";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function FlightSearchHome() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [errorInParams, setErrorInParams] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	// material UI state and function for backdrops
	const [open, setOpen] = useState(true);

	//

	// useEffect to get the data from URL search params
	// ?twoway=true&src=DEL&dest=BOM&day=
	useEffect(() => {
		const isTwoWay = searchParams.get("twoway");
		const source = searchParams.get("src");
		const destination = searchParams.get("dest");
		const dayD = searchParams.get("dayD");
		const dayM = searchParams.get("dayM");
		const dayY = searchParams.get("dayY");
		const dayW = searchParams.get("dayW");
		const retrunDay = searchParams.get("retrunDay");

		// in future when I design my own API, the day and returnDay params will get extended
		// let flight date be 12th April 2024
		// dayD=12,dayM=3,dayY=2024, dayW=5
		// in dayjs, month is 0 based index, hence month[3] is April
		// similarly, returnD, returnM, returnY, returnW
		const noOfTravellers = searchParams.get("travellers");
		console.log(isTwoWay);
	}, [router.isReady]);
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
			{!loading && (
				<div className="flight-search-home">
					<FspSearchBox />
					{!errorInParams && <SearchMainBox />}
				</div>
			)}
		</FlightSearchProvider>
	);
}
