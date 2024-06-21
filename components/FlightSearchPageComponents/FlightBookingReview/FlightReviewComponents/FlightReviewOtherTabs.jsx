import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import coverageIcon from "@/public/assests/images/icons/flightReviewIcons/coverage-icon-v1.svg";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { useEffect, useState } from "react";

// objects and icons for insurance cards
import baggaeLoss from "@/public/assests/images/icons/flightReviewIcons/insurance/bgg-loss.svg";
import coffin from "@/public/assests/images/icons/flightReviewIcons/insurance/coffin.svg";
import delayCheckIn from "@/public/assests/images/icons/flightReviewIcons/insurance/delay-checkin.svg";
import pa from "@/public/assests/images/icons/flightReviewIcons/insurance/pa-icon.svg";
import hsp from "@/public/assests/images/icons/flightReviewIcons/insurance/hsp-icon.svg";
import tripCancel from "@/public/assests/images/icons/flightReviewIcons/insurance/trip-cancel.svg";
import tripDelay from "@/public/assests/images/icons/flightReviewIcons/insurance/trip-delay.svg";
const TRAVEL_INSURANCE_CONTENT = [
	{
		header: "Hospitalization",
		para: "Sum Insured : INR 1,00,000",
		icon: hsp.src,
	},
	{
		header: "Trip Cancellation",
		para: "Sum Insured : INR 20,000",
		icon: tripCancel.src,
	},
	{
		header: "Trip Delay",
		para: "Sum Insured : INR 10,000",
		icon: tripDelay.src,
	},
	{
		header: "Personal Accident",
		para: "Sum Insured : INR 7,00,000",
		icon: pa.src,
	},
	{
		header: "Baggage Loss",
		para: "Sum Insured : INR 10,000",
		icon: baggaeLoss.src,
	},
	{
		header: "Baggage Delay",
		para: "Sum Insured : INR 5,000",
		icon: delayCheckIn.src,
	},
	{
		header: "Repatriation of Remains",
		para: "Sum Insured : INR 50,000",
		icon: coffin.src,
	},
];
//
// why us content
import icon247 from "@/public/assests/images/icons/flightReviewIcons/whyUs/247.png";
import members from "@/public/assests/images/icons/flightReviewIcons/whyUs/members.png";
import secure from "@/public/assests/images/icons/flightReviewIcons/whyUs/secure.png";
import trust from "@/public/assests/images/icons/flightReviewIcons/whyUs/trust.png";
const WHY_US_CONTENT = [
	{
		header: "24/7 Customer Support ",
		para: "We're here to help whenever you need us",
		icon: icon247.src,
	},
	{
		header: "Secure Booking Process",
		para: "Your personal information is secured using the latest industry standards",
		icon: secure.src,
	},
	{
		header: "Trusted by Members",
		para: "We've earned 4.8/5 stars on Google playstore",
		icon: trust.src,
	},
	{
		header: "20 Million Happy Members",
		para: "Millions of members worldwide rely on EaseMyTrip for their travel needs ",
		icon: members.src,
	},
];
//
export default function FlightReviewOtherTabs() {
	return (
		<div className="flight-review-other-tabs">
			<MedicalRefundPolicyCard />
			<GoodToKnowCard />
			<FlightReviewImportantInformationCard />
			<FlightReviewInsuranceCard />
			<FlightReviewWhyUs />
		</div>
	);
}

function MedicalRefundPolicyCard() {
	const [radioValue, setRadioValue] = useState("yes");
	useEffect(() => {
		console.log("FRRPC", radioValue);
	}, [radioValue]);
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
							id="yes-radio"
							value="yes"
							name="isPolicy"
							checked={radioValue === "yes"}
							onChange={(event) => {
								event.stopPropagation();
								setRadioValue(event.target.value);
							}}
						/>
						<label htmlFor="yes-radio">
							Yes, I want to add Medical Refund Policy (FREE) to
							this flight.{radioValue}
						</label>
					</div>
					<div
						className=" flex-start-center"
						style={{ columnGap: "20px" }}
					>
						<input
							type="radio"
							id="no-radio"
							value="no"
							name="isPolicy"
							checked={radioValue === "no"}
							onChange={(event) => {
								event.stopPropagation();
								setRadioValue("no");
							}}
						/>
						<label htmlFor="no-radio">
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
	const [elementCount, setElementCount] = useState(3);
	const [radioValue, setRadioValue] = useState("yes");
	useEffect(() => {
		console.log("FRIC", radioValue);
	}, [radioValue]);
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
			<div className="flight-review-insurance-card-content">
				<div className="flight-review-insurance-cards-box">
					{TRAVEL_INSURANCE_CONTENT.map((element, index) => {
						if (index + 1 <= elementCount) {
							return (
								<InsuranceSingleCard
									element={element}
									key={index}
								/>
							);
						} else return null;
					})}
					{elementCount <= 3 && (
						<div
							className="flight-review-insurance-single-card flex-center-center"
							id="show-more-button"
							onClick={() => setElementCount(7)}
						>
							<p>4+</p>
							<p>more</p>
						</div>
					)}
					{elementCount > 3 && (
						<div
							className="flight-review-insurance-single-card flex-center-center"
							id="show-more-button"
							onClick={() => setElementCount(3)}
						>
							<p>Show Less</p>
						</div>
					)}
				</div>
				<div className="flight-review-insurance-card-radio-buttons">
					<div
						className=" flex-start-center"
						style={{ columnGap: "20px" }}
					>
						<input
							type="radio"
							id="yesInsurance"
							value="yes"
							name="isInsurance"
							checked={radioValue === "yes"}
							onChange={(event) =>
								setRadioValue(event.target.value)
							}
						/>
						<label htmlFor="yesInsurance">
							Yes, I want to secure my trip with insurance.
						</label>
					</div>
					<div className="flight-review-insurance-pursuasion">
						<p>
							More than 36% of our customer choose to secure their
							trip.
						</p>
					</div>
					<div
						className=" flex-start-center"
						style={{ columnGap: "20px" }}
					>
						<input
							type="radio"
							id="noInsurance"
							value="no"
							name="isInsurance"
							checked={radioValue === "no"}
							// checked={true}
							onChange={(event) =>
								setRadioValue(event.target.value)
							}
						/>
						<label htmlFor="noInsurance">
							No, I don't wish to insure my trip.
						</label>
					</div>
					{radioValue == "no" && (
						<div
							className="flight-review-insurance-pursuasion"
							id="more-pursuasion"
						>
							<p>
								<span>Mr. ABHISHEK</span> missed the connecting
								flight but compensated with Rs.2000. Thanks to
								the travel insurance.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function InsuranceSingleCard({ element }) {
	return (
		<div className="flight-review-insurance-single-card flex-center-center">
			<div className="icon-div">
				<img src={element.icon} />
			</div>
			<h3>{element.header}</h3>
			<p>{element.para}</p>
		</div>
	);
}

function FlightReviewWhyUs() {
	return (
		<div className="flight-review-imp-info-card good-to-know-card">
			<div className="flight-review-imp-info-header flex-start-center medical-refund-policy-header">
				<LabelImportantOutlinedIcon />{" "}
				<h3>Why book with EaseMyTrip?</h3>
			</div>
			<div className="flight-review-imp-info-content why-us-content">
				<ul className="flight-review-why-us-content-list">
					{WHY_US_CONTENT.map((element, index) => (
						<li key={index} className="flex-start-center">
							<div className="icon-div">
								<img src={element.icon} />
							</div>
							<div className="content-div">
								<h3>{element.header}</h3>
								<p>{element.para}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
