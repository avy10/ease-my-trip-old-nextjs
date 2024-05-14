import { useState, useEffect } from "react";
import TopCard from "./TopCard";
import FlightDetailsContainerDynamic from "./FlightDetailsContainerDynamic";
import FareRules from "./FareRules";
import FareDetails from "./FareDetails";
import BaggageInformation from "./BaggageInformation";

export default function SingleFlightDetailsMain({
	flightID,
	handleSetShowFlightDetails,
	flightIcon,
	carrierName,
	fullFlightName,
}) {
	const [flightData, setFlightData] = useState([]);
	const [showTabNumber, setShowTabNumber] = useState(0);
	const [loading, setLoading] = useState(true);
	function handleSetShowTabNumber(val) {
		setShowTabNumber(val);
	}
	useEffect(() => {
		setLoading(true);
		const myHeaders = new Headers();
		myHeaders.append("projectID", "${projectID}");
		myHeaders.append("random", "adsaav");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(
			`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightID}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				setFlightData(result.data);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	}, []);
	return (
		<>
			{!loading && (
				<div className="flight-details">
					<TopCard
						handleSetShowFlightDetails={handleSetShowFlightDetails}
						showTabNumber={showTabNumber}
						handleSetShowTabNumber={handleSetShowTabNumber}
					/>
					{showTabNumber == 0 && (
						<FlightDetailsContainerDynamic
							flightData={flightData}
							flightIcon={flightIcon}
							carrierName={carrierName}
							fullFlightName={fullFlightName}
						/>
					)}
					{showTabNumber == 1 && (
						<FareDetails flightPrice={flightData.ticketPrice} />
					)}
					{showTabNumber == 2 && (
						<BaggageInformation
							flightIcon={flightIcon}
							carrierName={carrierName}
							fullFlightName={fullFlightName}
						/>
					)}
					{showTabNumber == 3 && <FareRules />}
				</div>
			)}
		</>
	);
}
/* flightIcon={flightIcon}
				carrierName={carrierName}
				fullFlightName={fullFlightName} */
