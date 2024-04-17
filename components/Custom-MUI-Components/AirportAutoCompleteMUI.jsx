import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useState, useContext } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
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
					// if event is not passed as first argument i.e. (newValue) then JS treats the name newValue as event itself
					// in order to pass the selection airport-object we need to pass in event as a first argument and then the newer value
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
						<p>
							{option.iata_code}, {option.name}, {option.city}
						</p>
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
