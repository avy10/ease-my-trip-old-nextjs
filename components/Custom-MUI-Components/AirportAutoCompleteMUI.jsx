import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useState, useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";

export default function AirportAutoCompleteMUI({
	optionsName,
	airportSelection,
	labelText,
}) {
	const searchData = useContext(FlightSearchContext);
	const { updateFlightSearchStates } = searchData;
	const customTheme = (outerTheme) =>
		createTheme({
			palette: {
				mode: outerTheme.palette.mode,
			},
			components: {
				MuiTextField: {
					styleOverrides: {
						root: {
							"--TextField-brandBorderColor": "#E0E3E7",
							"--TextField-brandBorderHoverColor": "#E0E3E7",
							"--TextField-brandBorderFocusedColor": "#E0E3E7",

							"& label.Mui-focused, label ": {
								color: "black",
							},
						},
					},
				},
			},
		});
	// console.log("airportSelection", airportSelection);
	const outerTheme = useTheme();
	const [val, setVal] = useState(airportSelection);
	const [airportNameError, setAirportNameError] = useState(false);
	return (
		<ThemeProvider theme={customTheme(outerTheme)}>
			<Autocomplete
				value={airportSelection}
				onChange={(event, newValue) => {
					console.log(newValue);
					// setVal(newValue);
					updateFlightSearchStates(labelText, newValue);
				}}
				autoComplete={true}
				clearOnEscape={true}
				className="airport-selection"
				id="airport-select"
				sx={{ width: 200 }}
				options={optionsName}
				autoHighlight
				getOptionLabel={(option) =>
					`${option.iata_code}, ${option.city}`
				}
				isOptionEqualToValue={(option, value) => {
					if (option.iata_code === value.iata_code) {
						setAirportNameError(false);
					} else {
						setAirportNameError(true);
					}
					return option.iata_code === value.iata_code;
				}}
				renderOption={(props, option) => (
					<Box
						value={airportSelection}
						className="airportsSelection"
						component="li"
						sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
						{...props}
					>
						{option.iata_code}, {option.name}, {option.city}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						required
						error={airportNameError}
						color={airportNameError ? "error" : "primary"}
						className="airportsSelection"
						{...params}
						label="Search Airports"
						placeholder={labelText}
						inputProps={{
							...params.inputProps,
							// autoComplete: "new-password", // disable autocomplete and autofill
						}}
					/>
				)}
			/>
		</ThemeProvider>
	);
}
