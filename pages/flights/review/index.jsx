import BaggageInformation from "@/components/FlightSearchPageComponents/SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/BaggageInformation";
import Container from "@mui/material/Container";

import { useRouter } from "next/router";

// breadcrumbs
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import { useEffect, useState } from "react";
import FlightReview, {
	FlightReviewModal,
} from "@/components/FlightSearchPageComponents/FlightBookingReview/FlightReview";
import FlightReviewOtherTabs from "@/components/FlightSearchPageComponents/FlightBookingReview/FlightReviewComponents/FlightReviewOtherTabs";
import FlightReviewPricingDesktop, {
	PriceCard,
} from "@/components/FlightSearchPageComponents/FlightBookingReview/FlightReviewPricing";
import { CurrencyRupeeOutlined } from "@mui/icons-material";
// not using bread crumbs cz they use position fixed
/*  */
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { createPortal } from "react-dom";
export default function ReviewHome() {
	const router = useRouter();
	const authorisationStateData = useAuthorisationContext();
	const { width } = authorisationStateData;
	const [fid, setFid] = useState(undefined);
	const [flightFare, setFlightFare] = useState(undefined);
	const [noOfPassengers, setNoOfPassengers] = useState(1);

	function updateNoOfPassengers(val) {
		setNoOfPassengers(val);
	}
	function updateFlightFare(val) {
		setFlightFare(val);
	}
	const [medicalRefunSelected, setMedicalRefundTable] = useState(true);
	function updateMedicalRefunSelected(value) {
		setMedicalRefundTable(value);
	}
	const [travelInsuranceSelected, setTravelInsuranceSelected] =
		useState(false);
	function updateTravelInsuranceSelected(value) {
		setTravelInsuranceSelected(value);
	}

	useEffect(() => {
		const { id } = router.query;
		setFid(id);
		console.log("index is reloading", id);
		const citiesData = JSON.parse(localStorage.getItem("citiesData"));
		const { numberOfPassengers } = citiesData;
		updateNoOfPassengers(numberOfPassengers);
		// alert(f_id);
	}, [router.isReady]);
	const [tabNumber, setTabNumber] = useState(0);
	function updateTabNumber(newTabNumber) {
		setTabNumber(newTabNumber);
	}

	const [showPriceCardModal, setShowPriceCardModal] = useState(false);
	const handleOpen = () => setShowPriceCardModal(true);
	const handleClose = () => {
		console.log("I AM CLOSING PRICE MODAL");
		setShowPriceCardModal(false);
	};
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
					{fid && (
						<FlightReview
							updateFlightFare={updateFlightFare}
							fid={fid}
						/>
					)}
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
					{tabNumber == 0 && (
						<FlightReviewOtherTabs
							medicalRefunSelected={medicalRefunSelected}
							updateMedicalRefunSelected={
								updateMedicalRefunSelected
							}
							travelInsuranceSelected={travelInsuranceSelected}
							updateTravelInsuranceSelected={
								updateTravelInsuranceSelected
							}
						/>
					)}
					{tabNumber == 1 && <TestingTabTwo />}
					{tabNumber == 2 && <TestingTabThree />}
				</Container>
				{width > 675 && flightFare !== undefined && (
					<FlightReviewPricingDesktop
						flightFare={flightFare}
						medicalRefunSelected={medicalRefunSelected}
						travelInsuranceSelected={travelInsuranceSelected}
					/>
				)}
				{
					/* code for the bottom of mobile pages */
					width <= 674 && (
						<div
							className="mobile-price-modal"
							onClick={handleOpen}
						>
							<div className="price-modal-trigger-div">
								<p style={{ fontSize: "12px" }}>Grand Total</p>
								<p
									style={{
										fontSize: "20px",
										fontWeight: 600,
									}}
								>
									<CurrencyRupeeOutlined
										sx={{ fontSize: "16px" }}
									/>
									{travelInsuranceSelected
										? flightFare + 199
										: flightFare}
									<InfoOutlinedIcon />
								</p>
							</div>
						</div>
					)
				}
				{showPriceCardModal &&
					createPortal(
						<FlightReviewModal
							showModal={showPriceCardModal}
							handleClose={handleClose}
							children={
								<PriceCard
									flightFare={flightFare}
									noOfPassengers={noOfPassengers}
									medicalRefunSelected={medicalRefunSelected}
									travelInsuranceSelected={
										travelInsuranceSelected
									}
								/>
							}
						/>,
						document.body
					)}
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

function TestingTabTwo() {
	return <div>I am tab two, will render when efgh is clicked</div>;
}
function TestingTabThree() {
	return <div>I am tab three, will render when ijkl is clicked</div>;
}
