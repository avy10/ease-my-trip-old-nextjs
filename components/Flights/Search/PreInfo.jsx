import RadioButtons from "../../Custom-mui-Components/RadioButtons";

import { pink } from "@mui/material/colors";
export default function PreInfo() {
	return (
		<div className="flight-pre-info">
			<div className="flight-travel-buttons">
				<RadioButtons
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
				/>
			</div>
			<div className="pre-info-box-title poppins-extrabold">
				Search Lowest Price
			</div>
		</div>
	);
}
