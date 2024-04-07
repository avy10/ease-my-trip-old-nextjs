import { useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
// radio imports
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";
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
				sx={{
					color: pink[50],
					"&.Mui-checked": {
						color: pink[50],
					},
				}}
			/>
			<label
				style={{
					color: pink[50],
					fontSize: "1.15rem",
					fontWeight: "600",
				}}
			>
				One-Way
			</label>
			<Radio
				checked={isTwoWay}
				onChange={() => {
					updateTwoWay(true);
				}}
				value="twoWay"
				name="radio-buttons"
				inputProps={{ "aria-label": "two way" }}
				sx={{
					color: pink[50],
					"&.Mui-checked": {
						color: pink[50],
					},
				}}
			/>
			<label
				style={{
					color: pink[50],
					fontSize: "1.15rem",
					fontWeight: "600",
				}}
			>
				Round Trip
			</label>
		</div>
	);
}
