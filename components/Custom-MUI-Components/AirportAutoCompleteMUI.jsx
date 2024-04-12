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
	customTheme,
	outerTheme,
	customSX,
	classNameValue,
	sizeValue = "medium",
	airportNameError,
	refTarget,
}) {
	const searchData = useContext(FlightSearchContext);
	const { updateFlightSearchStates } = searchData;

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
				className={classNameValue}
				id="airport-select"
				sx={customSX}
				size={sizeValue}
				options={optionsName}
				autoHighlight
				getOptionLabel={(option) =>
					`${option.iata_code}, ${option.city}`
				}
				isOptionEqualToValue={(option, value) => {
					// if (option.iata_code === value.iata_code) {
					// 	// console.log(
					// 	// 	"i am working to set airport name error to false"
					// 	// );
					// 	// setAirportNameError(false);
					// } else {
					// 	// console.log(
					// 	// 	"i am working to set airport name error to true"
					// 	// );
					// 	// setAirportNameError(true);
					// }
					return option.iata_code === value.iata_code;
				}}
				renderOption={(props, option) => (
					<Box
						value={airportSelection}
						className="airportsSelection"
						component="li"
						sx={{
							"& > img": { mr: 2, flexShrink: 0 },
						}}
						{...props}
					>
						{option.iata_code}, {option.name}, {option.city}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						ref={refTarget}
						onChange={(e) => console.log(e.target.value)}
						required
						error={airportNameError}
						color={airportNameError ? "error" : "primary"}
						sx={{ backgroundColor: "transparent" }}
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
