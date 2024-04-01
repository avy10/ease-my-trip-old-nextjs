import { useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
// radio imports
import Radio from "@mui/material/Radio";
export default function RadioButtons() {
	const searchData = useContext(FlightSearchContext);
	const { isTwoWay, updateTwoWay } = searchData;
	return (
		<div className="flight-travel-buttons">
			<Radio
				checked={!isTwoWay}
				onChange={() => {
					updateTwoWay(false);
				}}
				value="oneWay"
				name="radio-buttons"
				inputProps={{ "aria-label": "one way" }}
			/>
			<label>One-Way</label>
			<Radio
				checked={isTwoWay}
				onChange={() => {
					updateTwoWay(true);
				}}
				value="twoWay"
				name="radio-buttons"
				inputProps={{ "aria-label": "two way" }}
			/>
			<label>Two-Way</label>
		</div>
	);
}
