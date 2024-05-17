import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function RangeSlider() {
	const [value, setValue] = useState([6752, 37690]);

	const handleChange = (event, newValue) => {
		console.log(newValue);
		setValue(newValue);
	};

	function valuetext(value) {
		return `${value}°C`;
	}

	return (
		<Box className="slider-box-filter-box">
			<Slider
				getAriaLabel={() => "Temperature range"}
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
				min={6752}
				max={37690}
				step={1000}
			/>
			<div className="slider-values">
				<p>
					<CurrencyRupeeIcon className="rupee-symbol-in-filter-box" />
					{value[0]}
				</p>
				<p>
					<CurrencyRupeeIcon className="rupee-symbol-in-filter-box" />
					{value[1]}
				</p>
			</div>
		</Box>
	);
}
