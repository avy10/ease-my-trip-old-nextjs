import { useFlightSearch } from "@/contexts/FlightSearchContext";
import { useEffect, useState } from "react";
import FareRules from "./FareRules";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function FareDetails({
	flightPrice,
	numberOfPassengers,
	renderTnC,
}) {
	// const flightSearchData = useFlightSearch();
	// const { numberOfPassengers } = flightSearchData;

	// className = "airline-fare-details-table";
	return (
		<div className="airline-fare-details-div">
			<FareSummaryTable
				flightPrice={flightPrice}
				numberOfPassengers={numberOfPassengers}
			/>
			{/* <div className="airline-fare-details-table">
				<table>
					<tr>
						<td>
							{numberOfPassengers} x{" "}
							{numberOfPassengers == 1 ? "Adult" : "Adults"}
						</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{totalBaseFare}
						</td>
					</tr>
					<tr>
						<td>Total (Base Fare)</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{totalBaseFare}
						</td>
					</tr>
					<tr>
						<td>Total taxes</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{totalTax}
						</td>
					</tr>
					<tr>
						<td>Total (Fee and Surcharge)</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{numberOfPassengers * flightPrice}
						</td>
					</tr>
				</table>
			</div> */}
			<FareRules renderTnC={renderTnC} />
		</div>
	);
}

export function FareSummaryTable({
	flightPrice,
	numberOfPassengers,
	children,
}) {
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
	return (
		<div className="airline-fare-details-table">
			<table>
				<tbody>
					<tr>
						<td>
							{numberOfPassengers} x{" "}
							{numberOfPassengers == 1 ? "Adult" : "Adults"}
						</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{totalBaseFare}
						</td>
					</tr>
					<tr>
						<td>Total (Base Fare)</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{totalBaseFare}
						</td>
					</tr>
					<tr>
						<td>Total taxes</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{totalTax}
						</td>
					</tr>
					<tr>
						<td>
							Total <p>(Fee and Surcharge)</p>
						</td>
						<td>
							<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
							{numberOfPassengers * flightPrice}
						</td>
					</tr>
					{children}
				</tbody>
			</table>
		</div>
	);
}
