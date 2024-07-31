import RadioButtons from "./RadioButtons";
import styles from "./PreInfo.module.css";
import { pink } from "@mui/material/colors";
export default function PreInfo() {
	return (
		<div className={styles.preInfo}>
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
			<div className={styles.lowestPriceBox + " poppins-extrabold"}>
				{/* pre-info-box-title */}
				Search Lowest Price
			</div>
		</div>
	);
}
