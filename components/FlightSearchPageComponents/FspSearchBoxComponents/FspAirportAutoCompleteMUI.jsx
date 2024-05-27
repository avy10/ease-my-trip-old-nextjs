import { ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FspAirportAutoCompleteMUI({
	optionsName,
	airportSelection,
	dispatch,
	labelText,
	customTheme,
	outerTheme,
	customSX,
	classNameValue,
	sizeValue = "medium",
	airportNameError,
	refTarget,
	type,
	keyToUpdate,
	updateSourceChanged,
}) {
	return (
		<ThemeProvider theme={customTheme(outerTheme)}>
			<Autocomplete
				value={airportSelection}
				onChange={(event, newValue) => {
					if (labelText == "FROM") {
						updateSourceChanged();
					}
					dispatch({
						type,
						payload: newValue,
						keyToUpdate,
					});
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
					return option?.iata_code === value?.iata_code;
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
						}}
					/>
				)}
			/>
		</ThemeProvider>
	);
}
