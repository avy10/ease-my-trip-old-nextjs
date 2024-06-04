import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
	return `${value}°C`;
}

export default function RangeSlider() {
	const [value, setValue] = React.useState([6752, 37690]);

	const handleChange = (event, newValue) => {
		console.log(newValue);
		setValue(newValue);
	};

	return (
		<Box sx={{ width: 300 }}>
			<Slider
				getAriaLabel={() => "Temperature range"}
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
				min={6752}
				max={37690}
				step={1000}
				onMouseUp={() => console.log("Mouse released")}
			/>
			<p>{value[0]}</p>
			<p>{value[1]}</p>
		</Box>
	);
}
