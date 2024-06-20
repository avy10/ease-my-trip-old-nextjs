import BaggageInformation from "@/components/FlightSearchPageComponents/SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/BaggageInformation";
import Container from "@mui/material/Container";

import { useRouter } from "next/router";

// breadcrumbs
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import { useEffect, useState } from "react";
import FlightReview from "@/components/FlightSearchPageComponents/FlightBookingReview/FlightReview";
// not using bread crumbs cz they use position fixed
/*  */
export default function ReviewHome() {
	const router = useRouter();

	const [fid, setFid] = useState(undefined);
	useEffect(() => {
		const { id } = router.query;
		setFid(id);
		console.log("index is reloading", id);
		// alert(f_id);
	}, [router.isReady]);
	const [tabNumber, setTabNumber] = useState(0);
	function updateTabNumber(newTabNumber) {
		setTabNumber(newTabNumber);
	}
	return (
		<>
			<PageBreadcrumbs
				tabNumber={tabNumber}
				updateTabNumber={updateTabNumber}
			/>
			<Container
				className="flight-review-main-container"
				maxWidth="lg"
				sx={{
					position: "relative",
					top: "75px",
					border: "2px solid black",
				}}
			>
				{/* <BaggageInformation /> */}
				{fid && <FlightReview fid={fid} />}

				{/* <FlightReview fid={fid} /> */}
				{tabNumber == 0 && <TestingTabOne />}
				{tabNumber == 1 && <TestingTabTwo />}
				{tabNumber == 2 && <TestingTabThree />}
			</Container>
		</>
	);
}

function GoBackButton() {}

function PageBreadcrumbs({ tabNumber, updateTabNumber }) {
	const authorisationStateData = useAuthorisationContext();
	const { width } = authorisationStateData;
	const router = useRouter();

	return (
		<Container maxWidth="lg">
			<div className="flight-booking-preview-bread-crumbs">
				<Breadcrumbs
					separator={
						<NavigateNextIcon
							sx={{ color: "black" }}
							fontSize="large"
						/>
					}
					aria-label="breadcrumb"
				>
					<button
						className="bread-crumbs-go-back-btn flex-center-center"
						onClick={() => router.back()}
					>
						<KeyboardBackspaceIcon />
					</button>

					<div onClick={() => updateTabNumber(0)}>Abcd</div>
					<div onClick={() => updateTabNumber(1)}>efgh</div>
					<div onClick={() => updateTabNumber(2)}>ijkl</div>
				</Breadcrumbs>
			</div>
		</Container>
	);
}

function TestingTabOne() {
	return <div>I am tab one, will render when Abcd is clicked</div>;
}
function TestingTabTwo() {
	return <div>I am tab two, will render when efgh is clicked</div>;
}
function TestingTabThree() {
	return <div>I am tab three, will render when ijkl is clicked</div>;
}
