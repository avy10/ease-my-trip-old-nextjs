import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { topFlightsARR } from "@/public/utils/FlightUtils/topFlights";
import { useFlightSearch } from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import { useRouter } from "next/router";
export default function TopFlightRoutes() {
	const router = useRouter();
	const flightSearchData = useFlightSearch();
	const { day } = flightSearchData;
	function handleClickNavigation(source, destination) {
		var customParseFormat = require("dayjs/plugin/customParseFormat");
		dayjs.extend(customParseFormat);
		const newDate = day.format("DD-MM-YYYY");
		// const dayWeekName = day.format("ddd");
		const sortParams = JSON.stringify({ duration: 1 }); //if we do not perform JSON.stringify, the encoded becomes object object after encodingURI
		const encodedSortParams = encodeURIComponent(sortParams);
		router.push(
			`/flights/search?src=${source}&dest=${destination}&day=${newDate}&notv=${1}&sort=${encodedSortParams}`
		);
	}
	return (
		<div className="topFlightsDIV">
			<div className="titleDiv">
				<h1 className="title-EO">Top Flights Routes</h1>
			</div>
			<div className="topFlightGRID">
				{topFlightsARR.map((ele, index) => (
					<div
						className="topFlightELEMENT"
						key={index}
						onClick={() =>
							handleClickNavigation(ele.from_iata, ele.to_iata)
						}
					>
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
