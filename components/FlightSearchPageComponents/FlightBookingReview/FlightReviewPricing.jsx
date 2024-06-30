import { useEffect, useState } from "react";
import FareDetails, {
	FareSummaryTable,
} from "../SearchResultsPage/oneWayFlightsList/oneWayFlightsListComponents/singleFlightDetail/FareDetails";
import { Container } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function FlightReviewPricingDesktop({
	flightFare,
	medicalRefunSelected,
	travelInsuranceSelected,
}) {
	const [noOfPassengers, setNoOfPassengers] = useState(1);
	useEffect(() => {
		const citiesData = JSON.parse(localStorage.getItem("citiesData"));
		const { numberOfPassengers } = citiesData;
		setNoOfPassengers(+numberOfPassengers);
		console.log(flightFare, numberOfPassengers);
	}, []);

	return (
		<div>
			<div
				className="pricing-promo-cards-div"
				style={{
					position: "sticky",
					top: "120px",
				}}
			>
				<TestingSticky
					children={
						<PriceCard
							flightFare={flightFare}
							noOfPassengers={noOfPassengers}
							medicalRefunSelected={medicalRefunSelected}
							travelInsuranceSelected={travelInsuranceSelected}
						/>
					}
					topVal={"100px"}
				/>
				{/* <TestingSticky children={<PromoCard />} /> */}
			</div>
		</div>
	);
}

export function PriceCard({
	flightFare,
	noOfPassengers,
	medicalRefunSelected,
	travelInsuranceSelected,
}) {
	const [grandTotal, setGrandTotal] = useState(flightFare);
	useEffect(() => {
		if (travelInsuranceSelected) {
			setGrandTotal(flightFare + 199);
		} else {
			if (grandTotal > flightFare) {
				setGrandTotal(flightFare);
			}
		}
	}, [travelInsuranceSelected]);
	const medicalRefundTable = (
		<tr>
			<td>Medical Refund Policy</td>
			<td>
				<span id="strikethrough">
					<CurrencyRupeeIcon />
					199
				</span>
				<span id="green-text">Free</span>
			</td>
		</tr>
	);
	const insuranceTable = (
		<tr>
			<td>Insurance</td>
			<td>
				<CurrencyRupeeIcon />
				199
			</td>
		</tr>
	);
	const grandTotalTable = (
		<tr id="grand-total">
			<td>Grand Total</td>
			<td>
				<CurrencyRupeeIcon />
				{grandTotal}
			</td>
		</tr>
	);
	const extraTable = (
		<>
			{medicalRefunSelected && medicalRefundTable}
			{travelInsuranceSelected && insuranceTable}
			{grandTotalTable}
		</>
	);
	return (
		<div className="price-card">
			<div className="price-card-header">
				<h3>Price Summary</h3>
			</div>
			<div className="price-card-content">
				<FareSummaryTable
					flightPrice={flightFare}
					numberOfPassengers={noOfPassengers}
					children={extraTable}
				/>
			</div>
		</div>
	);
}
function PromoCard() {
	return (
		<div className="flight-review-promo-card">
			<div className="price-card-header">
				<h3>Price Summary</h3>
			</div>
			<div className="promo-card-content"></div>
		</div>
	);
}
function TestingSticky({ topVal, children }) {
	return (
		<div
			style={{
				width: "220px",
				height: "fit-content",
			}}
		>
			{children}{" "}
		</div>
	);
}
/* style={{
				position: "sticky",
				top: topVal,
				width: "280px",
				height: "150px",
				border: "2px solid red",
			}} */
