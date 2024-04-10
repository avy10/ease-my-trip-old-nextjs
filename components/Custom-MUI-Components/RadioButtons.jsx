import { useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
// radio imports
import Radio from "@mui/material/Radio";
export default function RadioButtons({
	radioStyle,
	labelStyle,
	radioSize = "medium",
}) {
	const searchData = useContext(FlightSearchContext);
	const { isTwoWay, updateTwoWay } = searchData;
	return (
		<>
			<Radio
				checked={!isTwoWay}
				onChange={() => {
					updateTwoWay(false);
				}}
				value="oneWay"
				name="radio-buttons"
				inputProps={{ "aria-label": "one way" }}
				sx={radioStyle}
				size={radioSize}
			/>
			<label style={labelStyle}>One-Way</label>
			<Radio
				checked={isTwoWay}
				onChange={() => {
					updateTwoWay(true);
				}}
				value="twoWay"
				name="radio-buttons"
				inputProps={{ "aria-label": "two way" }}
				sx={radioStyle}
				size={radioSize}
			/>
			<label style={labelStyle}>Round Trip</label>
		</>
	);
}
