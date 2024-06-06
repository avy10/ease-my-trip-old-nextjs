import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

//date imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import { domain, allTheAirports } from "@/public/utils/apiFetch";
export default function FlightHome() {
	return (
		<div className="flightHomeContainer">
			<SearchBox />
		</div>
	);
}

function SearchBox() {
	return (
		<div className="flightSearchBox">
			<div className="innerBox">
				<div className="boxTitle poppins-extrabold">
					Search Lowest Price
				</div>
				<MainBox />
			</div>
		</div>
	);
}

function MainBox() {
	const [airportNames, setAirportNames] = useState([]);
	useEffect(() => {
		fetch(`${domain}${allTheAirports}`, {
			method: "GET",
			headers: {
				projectID: "qwqzgpiy336h",
			},
		})
			.then((res) => res.json())
			.then((apiData) => setAirportNames(apiData?.data?.airports));
	}, []);
	useEffect(() => {
		console.log(airportNames);
	}, [airportNames]);
	return (
		<div className="mainBox">
			<AutoCompleteMUI airportNames={airportNames} boxName="FROM" />
			<AutoCompleteMUI airportNames={airportNames} boxName="TO" />
			<DatePickerMUI />
			<div>aa</div>
			<div>aa</div>
		</div>
	);
}

function AutoCompleteMUI({ airportNames, boxName }) {
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
								backgroundColor: "rgb(255, 255, 255)",
								fontWeight: "600",
								padding: "4px",
								display: "none",
							},
						},
					},
				},
			},
		});

	const outerTheme = useTheme();

	return (
		<ThemeProvider theme={customTheme(outerTheme)}>
			<Autocomplete
				autoComplete={true}
				clearOnEscape={true}
				className="airportsSelection"
				id="airport-select"
				sx={{ width: 300 }}
				options={airportNames}
				autoHighlight
				getOptionLabel={(option) =>
					`${option.iata_code}, ${option.name}, ${option.city}`
				}
				renderOption={(props, option) => (
					<Box
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
						className="airportsSelection"
						{...params}
						label={boxName}
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

function DatePickerMUI() {
	const [cleared, setCleared] = useState(false);
	useEffect(() => {
		if (cleared) {
			const timeout = setTimeout(() => {
				setCleared(false);
			}, 1500);

			return () => clearTimeout(timeout);
		}
		return () => {};
	}, [cleared]);
	const newTheme = (theme) =>
		createTheme({
			...theme,
			components: {
				MuiDateCalendar: {
					styleOverrides: {
						root: {
							color: "#bbdefb",
							borderRadius: "6px",
							borderWidth: "1px",
							borderColor: "#2196f3",
							border: "1px solid",
							backgroundColor: "white",
						},
					},
				},
			},
		});
	return (
		<ThemeProvider theme={newTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DesktopDatePicker
					label="DEPARTURE DATE"
					slotProps={{
						field: {
							clearable: true,
							onClear: () => setCleared(true),
						},
					}}
				/>
			</LocalizationProvider>
		</ThemeProvider>
	);
}
