// import RadioButtons from "@/components/Custom-MUI-Components/RadioButtons";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";

export default function FspRadioButtons({ isTwoWayFSP, dispatch }) {
	return (
		<div className="flight-search-radio-buttons">
			<RadioButtonsFSP
				radioStyle={{
					color: pink[50],
					"&.Mui-checked": {
						color: pink[50],
					},
				}}
				labelStyle={{
					color: pink[50],
					fontSize: "1rem",
					fontWeight: "600",
				}}
				radioSize="small"
				isTwoWay={isTwoWayFSP}
				dispatch={dispatch}
			/>
		</div>
	);
}
function RadioButtonsFSP({
	radioStyle,
	labelStyle,
	radioSize = "medium",
	isTwoWay,
	dispatch,
}) {
	return (
		<>
			<Radio
				checked={!isTwoWay}
				onChange={() => {
					dispatch({
						type: "updateIsTwoWay",
						payload: false,
						keyToUpdate: "isTwoWayFSP",
					});
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
					dispatch({
						type: "updateIsTwoWay",
						payload: true,
						keyToUpdate: "isTwoWayFSP",
					});
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
