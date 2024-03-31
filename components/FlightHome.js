import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
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
				<div className="boxTitle">Search Lowest Price</div>
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
				projectID: "4xh7gn2pv8it",
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
			<AutoCompleteMUI airportNames={airportNames} />
			<div>aa</div>
			<div>aa</div>
		</div>
	);
}

function AutoCompleteMUI({ airportNames }) {
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
						label="FROM"
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
