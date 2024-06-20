import { FlightLogoName } from "./FlightDetailsContainerDynamic";

export default function BaggageInformation({
	flightIcon,
	carrierName,
	fullFlightName,
}) {
	return (
		<div className="airline-baggage-info">
			<table>
				<thead>
					<tr>
						<th>Airline</th>
						<th>Check-in Baggage</th>
						<th>Cabin Baggage</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<FlightLogoName
								flightIcon={flightIcon}
								carrierName={carrierName}
								fullFlightName={fullFlightName}
							/>
						</td>
						<td>15Kgs</td>
						<td>7Kgs</td>
					</tr>
					<tr>
						<td colSpan={3}>
							<ul>
								<li>
									Baggage information mentioned above is
									obtained from airline's reservation system,
									EaseMyTrip does not guarantee the accuracy
									of this information.
								</li>
								<li>
									The baggage allowance may vary according to
									stop-overs, connecting flights. changes in
									airline rules. etc.
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
/* 
// old td
<div className="flight-logo-name flex-center-center">
								<div className="flight-logo-container">
									<img src={flightIcon} />
								</div>
								<div className="flight-text-container">
									<h3>{carrierName}</h3>
									<p>{fullFlightName}</p>
								</div>
							</div>
*/
