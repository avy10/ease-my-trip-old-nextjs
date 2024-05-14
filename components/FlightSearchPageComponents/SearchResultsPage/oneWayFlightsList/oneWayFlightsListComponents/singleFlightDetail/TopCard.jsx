import { useState } from "react";

export default function TopCard({
	handleSetShowFlightDetails,
	showTabNumber,
	handleSetShowTabNumber,
}) {
	function handleButtonClose() {
		handleSetShowTabNumber(0);
		handleSetShowFlightDetails();
	}
	return (
		<div className="single-flight-detail-topcard">
			{[
				"Flight Information",
				"Fare Details & Rules",
				"Baggage Information",
				"Cancellation & Change Rule",
			].map((ele, index) => (
				<div
					className={
						index == showTabNumber
							? "topcard-tabs topcard-active"
							: "topcard-tabs"
					}
					onClick={() => handleSetShowTabNumber(index)}
					key={index}
				>
					{ele}
				</div>
			))}
			<button onClick={handleButtonClose}>X</button>
		</div>
	);
}
