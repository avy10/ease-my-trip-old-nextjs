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
				}}
			>
				{/* border: "2px solid black", */}
				<div
					style={{
						position: "fixed",
						top: "0",
						left: "0",
						height: "100vh",
						width: "100vw",
						backgroundColor: "#E8F2FA",
						zIndex: "-4",
					}}
				></div>
				{/* background-color: #E8F2FA!important; */}
				<Container
					maxWidth="lg"
					sx={{
						padding: "0px",
					}}
				>
					{/* border: "2px solid green", */}
					{/* <BaggageInformation /> */}
					{fid && <FlightReview fid={fid} />}
					{/* 
				there is 3 sections / tabs
				Note : Flight Review, Pricing tab, Coupons tabs will remain fixed on desktop
				flight review remains fixed on mobile while coupons tab will be moved to the bottom and price will be moved to a modal
				1. flight review
					a. Flight Review :- contains flight info like airline, source-destination, timings
				flight review will always stay on top
					b. Flight review other tabs :- contains all the other tabs of the flight review like pricing, medical refund, insurance, etc
						this tab will render when tabNumber == 0 
				2. Travellers details
				NOTE : once travellers details is filled we will render a travellers details filled card which will show user his name email id etc and it will again have an edit button
				3. payment section
				once we move onto tab 2, we are gonna display an edit button on it
				which will take the user back to the  */}
					{/* <FlightReview fid={fid} /> */}
					{tabNumber == 0 && <TestingTabOne />}
					{tabNumber == 1 && <TestingTabTwo />}
					{tabNumber == 2 && <TestingTabThree />}
				</Container>
				<div
					className="smol-container"
					style={{ border: "2px solid blue" }}
				>
					<TestingSticky topVal={"100px"} />
					<TestingSticky topVal={"250px"} />
				</div>
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

function TestingSticky({ topVal }) {
	return (
		<div
			style={{
				position: "sticky",
				top: topVal,
				width: "320px",
				height: "150px",
				border: "2px solid red",
			}}
		>
			I AM ABHISHEK
		</div>
	);
}
// top: "120px",
// 				right: "351px",
