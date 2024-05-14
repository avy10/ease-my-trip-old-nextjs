import { useFlightSearch } from "@/contexts/FlightSearchContext";
import { useEffect, useState } from "react";
import FareRules from "./FareRules";

export default function FareDetails({ flightPrice }) {
	const flightSearchData = useFlightSearch();
	const { numberOfPassengers } = flightSearchData;

	const [flightPriceBeforeTax, setFlightPriceBeforeTax] =
		useState(flightPrice);
	const [taxes, setTaxes] = useState(5);
	const [taxAmount, setTaxAmount] = useState(flightPrice);
	const [totalBaseFare, setTotalBaseFare] = useState();
	const [totalTax, seTotalTax] = useState();
	useEffect(() => {
		let calculation = ((flightPriceBeforeTax * 5) / 100).toFixed(2);

		setTaxAmount(calculation);
		const copyFlightPriceBeforeTax = (flightPrice - calculation).toFixed(2);

		setFlightPriceBeforeTax((flightPrice - calculation).toFixed(2));
		setTotalBaseFare(
			(numberOfPassengers * copyFlightPriceBeforeTax).toFixed(2)
		);
		seTotalTax((numberOfPassengers * calculation).toFixed(2));
	}, []);
	// className = "airline-fare-details-table";
	return (
		<div className="airline-fare-details-div">
			<div className="airline-fare-details-table">
				<table>
					<tr>
						<td>
							{numberOfPassengers} x{" "}
							{numberOfPassengers == 1 ? "Adult" : "Adults"}
						</td>
						<td>{totalBaseFare}</td>
					</tr>
					<tr>
						<td>Total (Base Fare)</td>
						<td>{totalBaseFare}</td>
					</tr>
					<tr>
						<td>Total taxes</td>
						<td>{totalTax}</td>
					</tr>
					<tr>
						<td>Total (Fee and Surcharge)</td>
						<td>{numberOfPassengers * flightPrice}</td>
					</tr>
				</table>
			</div>
			<FareRules />
		</div>
	);
}
