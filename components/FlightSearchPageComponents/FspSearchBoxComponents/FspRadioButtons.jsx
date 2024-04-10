import RadioButtons from "@/components/Custom-MUI-Components/RadioButtons";
import { pink } from "@mui/material/colors";
export default function FspRadioButtons() {
	return (
		<div className="flight-search-radio-buttons">
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
				radioSize="small"
			/>
		</div>
	);
}
