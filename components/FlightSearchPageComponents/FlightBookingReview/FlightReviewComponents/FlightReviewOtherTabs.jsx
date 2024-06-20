import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import coverageIcon from "@/public/assests/images/icons/flightReviewIcons/coverage-icon-v1.svg";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { useState } from "react";
export default function FlightReviewOtherTabs() {
	return (
		<div className="flight-review-other-tabs">
			<MedicalRefundPolicyCard />
			<GoodToKnowCard />
			<FlightReviewImportantInformationCard />
			<FlightReviewInsuranceCard />
		</div>
	);
}

function MedicalRefundPolicyCard() {
	const [radioValue, setRadioValue] = useState("sisi");
	return (
		<div className="medical-refund-policy-card">
			<div className="medical-refund-policy-header flex-start-center">
				<div className="medical-refund-policy-header-img">
					<img src={coverageIcon.src} />
				</div>
				<div className="medical-refund-policy-header-text">
					<h3>FREE Medical Refund Policy</h3>
				</div>
				<CheckCircleOutlineIcon />
			</div>
			{/*  */}
			<div className="medical-refund-policy-content">
				<p>
					Get full airline refund, if you cancel tickets due to
					illness or sickness. This service is provided at sickness.
					This service is provided at{" "}
					<span>ZERO additional charges.</span>
				</p>
				<div className="medical-refund-policy-selection-boxes">
					<div
						className=" flex-start-center"
						style={{ columnGap: "20px" }}
					>
						<input
							type="radio"
							id="si"
							value={radioValue}
							name="isPolicy"
							checked={radioValue == "sisi"}
							onClick={() => setRadioValue("sisi")}
						/>
						<label htmlFor="si">
							Yes, I want to add Medical Refund Policy (FREE) to
							this flight.
						</label>
					</div>
					<div
						className=" flex-start-center"
						style={{ columnGap: "20px" }}
					>
						<input
							type="radio"
							id="noop"
							value={radioValue}
							name="isPolicy"
							checked={radioValue == "noop"}
							onClick={() => setRadioValue("noop")}
						/>
						<label htmlFor="noop">
							No, I don't wish to add Medical Refund Policy (FREE)
							to this flight.
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

function GoodToKnowCard() {
	return (
		<div className="good-to-know-card">
			<div className="good-to-know-card-header flex-start-center">
				<ThumbUpOutlinedIcon sx={{ color: "#14b714" }} />
				<div>
					<h3>Good to know</h3>
					<p>Information you should know</p>
				</div>
			</div>
			<div className="good-to-know-card-content">
				<ul>
					<li>
						15 Kgs per passenger Check-in Baggage included for your
						selected flight
					</li>
					<li>
						1 PC per passenger Check-in Baggage included for your
						selected flight
					</li>
					<li>
						Airline Cancellation Fee is Rs 3100 per passenger for
						your selected flight
					</li>
					<li>
						Remember to web check-in before arriving at the airport
					</li>
					<li>Face masks are advisable</li>
				</ul>
			</div>
		</div>
	);
}

function FlightReviewImportantInformationCard() {
	return (
		<div className="flight-review-imp-info-card good-to-know-card">
			<div className="flight-review-imp-info-header flex-start-center medical-refund-policy-header">
				<LabelImportantOutlinedIcon /> <h3>Important Information</h3>
			</div>
			<div className="flight-review-imp-info-content good-to-know-card-content">
				<ul>
					<li>
						Wearing face masks is no longer compulsory. However,
						it’s highly advised to wear masks to stay protected from
						threats imposed by COVID-19.
					</li>
					<li>
						Travellers can check the detailed travel guidelines
						issued by the Indian government.
					</li>
				</ul>
			</div>
		</div>
	);
}

function FlightReviewInsuranceCard() {
	return (
		<div className="flight-review-insurance-card">
			<div className="flight-review-insurance-card-header flex-start-center">
				<HealthAndSafetyOutlinedIcon />
				<div>
					<h3>Add Travel Insurance and Secure your Trip with ACKO</h3>
					<p>
						<CurrencyRupeeOutlinedIcon sx={{ fontSize: "12px" }} />
						199/Person
					</p>
				</div>
			</div>
			<div className="flight-review-insurance-card-content">as</div>
		</div>
	);
}
