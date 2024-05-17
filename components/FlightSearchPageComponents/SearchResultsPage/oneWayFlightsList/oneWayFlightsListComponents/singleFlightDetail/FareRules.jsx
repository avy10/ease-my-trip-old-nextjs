import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function FareRules() {
	return (
		<div className="airline-fare-rules">
			<p>Fare Rules</p>
			<p id="refundable">Refundable</p>
			<TableFormation
				purpose={"Cancel"}
				airlineFeesEarly={3100}
				airlineFeesLate={3600}
				emtFees={300}
			/>
			<TableFormation
				purpose={"Reschedule"}
				airlineFeesEarly={2850}
				airlineFeesLate={3350}
				emtFees={300}
			/>
			<TermsAndCondition />
		</div>
	);
}

function TableFormation({
	purpose,
	airlineFeesEarly,
	airlineFeesLate,
	emtFees,
}) {
	return (
		<table className="airline-fare-rules-table">
			<thead>
				<tr>
					<th>
						Time Frame to {purpose}{" "}
						<span>Before scheduled departure time</span>
					</th>
					<th>
						Airline Fees
						<span>per passenger</span>
					</th>
					<th>
						EMT Fees
						<span>per passenger</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{purpose} Before 96 hours of departure time</td>
					<td>
						{" "}
						<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
						{airlineFeesEarly}
					</td>
					<td>
						{" "}
						<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
						{emtFees}
					</td>
				</tr>
				<tr>
					<td>
						{purpose} Within 96 hours & before 4 hours of departure
						time
					</td>
					<td>
						{" "}
						<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
						{airlineFeesLate}
					</td>
					<td>
						{" "}
						<CurrencyRupeeIcon className="rupee-symbol-in-fare-tables" />
						{emtFees}
					</td>
				</tr>
			</tbody>
		</table>
	);
}

function TermsAndCondition() {
	return (
		<div className="airFare-terms-conditions">
			<h3>Terms & Conditions</h3>
			<ul>
				<li>
					Total Rescheduling Charges Airlines Rescheduling fees Fare
					Difference if applicable + EMT Fees.
				</li>
				<li>
					The airline cancel reschedule fees is indicative and can be
					changed without any prior notice by the airlines.
				</li>
				<li>
					EaseMyTrip does not guarantee the accuracy of cancel
					reschedule fees.
				</li>
				<li>
					Partial cancellation is not allowed on the flight tickets
					which are book under special round trip discounted fares.
				</li>
				<li>
					Airlines doesnt allow any additional baggage allowance for
					any infant added in the booking.
				</li>
				<li>
					In certain situations of restricted cases, no amendments and
					cancellation is allowed
				</li>
				<li>
					Airlines cancel reschedule should be reconfirmed before
					requesting for a cancellation or amendment
				</li>
			</ul>
		</div>
	);
}
