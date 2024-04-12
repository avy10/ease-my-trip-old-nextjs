import { useState, useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
export default function SelectTravellersNumber({ sizeValue, refTarget }) {
	const searchData = useContext(FlightSearchContext);
	const { updateFlightSearchStates, numberOfPassengers } = searchData;
	return (
		<Box ref={refTarget} sx={{ minWidth: 120 }}>
			<FormControl fullWidth size={sizeValue}>
				<InputLabel id="demo-simple-select-label">
					Number of Travellers
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={numberOfPassengers}
					label="Select a number"
					onChange={(e) => {
						// setNumber(e.target.value);
						updateFlightSearchStates(
							"numberOfPassengers",
							e.target.value
						);
					}}
					ref={refTarget}
				>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={6}>6</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
