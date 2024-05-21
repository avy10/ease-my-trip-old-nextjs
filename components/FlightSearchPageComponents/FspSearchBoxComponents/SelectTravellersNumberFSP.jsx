import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function SelectTravellersNumberFSP({
	numberOfPassengers,
	sizeValue,
	refTarget,
	dispatch,
}) {
	return (
		<Box ref={refTarget} sx={{ minWidth: 120 }}>
			<FormControl
				className="abhishekKumar"
				fullWidth
				size={sizeValue}
				ref={refTarget}
			>
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
						dispatch({
							type: "updateNumberOfTravellers",
							payload: e.target.value,
							keyToUpdate: "noOfTravellersFSP",
						});
					}}
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
