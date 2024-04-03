import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { topFlightsARR } from "@/public/utils/FlightUtils/topFlights";
export default function TopFlightRoutes() {
	return (
		<div className="topFlightsDIV">
			<div className="titleDiv">
				<h1 className="title-EO">Top Flights Routes</h1>
			</div>
			<div className="topFlightGRID">
				{topFlightsARR.map((ele, index) => (
					<div className="topFlightELEMENT" key={index}>
						<AirplaneTicketIcon
							className="topFlightICON"
							fontSize="large"
						/>
						<div className="topFlightTEXT">
							<p>
								{ele.from}
								<ConnectingAirportsIcon
									fontSize="large"
									className="topFlightAirportsICON"
								/>
								{ele.to}
							</p>
							<p className="topFlight-IATA">
								{ele.from_iata}-{ele.to_iata}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
