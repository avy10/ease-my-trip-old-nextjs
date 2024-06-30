import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

export default function HotelCitySelector({
	selectedHotelCity,
	updateSelectedHotelCity,
}) {
	const hotelSearchData = useHotelSearchContext();
	const { cityList } = hotelSearchData;
	return (
		<div id="hotel-city-selector">
			<label className="label-text-user">
				<span>Enter City name</span>
			</label>
			<HotelSearchAutoComplete
				selectedHotelCity={selectedHotelCity}
				updateSelectedHotelCity={updateSelectedHotelCity}
				cityList={cityList}
			/>
		</div>
	);
}

function HotelSearchAutoComplete({
	selectedHotelCity,
	updateSelectedHotelCity,
	cityList,
}) {
	const outerTheme = useTheme();

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
							"& .Mui-error": {
								color: "red",
							},
						},
					},
				},
			},
		});

	return (
		<ThemeProvider theme={customTheme(outerTheme)}>
			<Autocomplete
				value={selectedHotelCity}
				onChange={(event, newValue) => {
					// if event is not passed as first argument i.e. (newValue) then JS treats the name newValue as event itself
					// in order to pass the selection airport-object we need to pass in event as a first argument and then the newer value
					// console.log(newValue);
					// setVal(newValue);
					updateSelectedHotelCity(newValue);
				}}
				autoComplete={true}
				clearOnEscape={true}
				className={"selected-hotel-city-name"}
				id="hotel-city-select"
				sx={{ width: 200 }}
				options={cityList}
				autoHighlight
				getOptionLabel={(option) => `${option.cityState}`}
				isOptionEqualToValue={(option, value) => {
					return option?.cityState === value?.cityState;
				}}
				renderOption={(props, option) => (
					<Box
						value={selectedHotelCity}
						className="selectedHotelCitySelection"
						component="li"
						sx={{
							"& > img": { mr: 2, flexShrink: 0 },
						}}
						{...props}
					>
						<p>{option.cityState}</p>
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						// ref={refTarget}
						onChange={(e) => console.log(e.target.value)}
						required
						// error={airportNameError}
						// color={airportNameError ? "error" : "primary"}
						color={"primary"}
						sx={{ backgroundColor: "transparent" }}
						className="selectedHotelCitySelection-text-filed"
						{...params}
						label="Search Hotels"
						placeholder={"Search Hotels"}
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
