import AirportAutoCompleteMUI from "@/components/Custom-MUI-Components/AirportAutoCompleteMUI";
import styles from "./AirportSearchBoxes.module.css";
import { createTheme, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
export default function AirportSearchBoxes({
	airportNames,
	target,
	labelText,
	children,
	airportErrorTarget,
	updateErrorState,
	keyVal,
	refTarget,
}) {
	// "--TextField-brandBorderColor": "#E0E3E7",
	// "--TextField-brandBorderHoverColor": "#E0E3E7",
	// "--TextField-brandBorderFocusedColor": "#E0E3E7",

	useEffect(() => {
		if (target?.name == null || target == null) {
			updateErrorState(keyVal, true);
		} else {
			updateErrorState(keyVal, false);
		}
	}, [target]);
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
	const outerTheme = useTheme();
	return (
		<>
			<div
				className={
					styles.singleSearchComponent + " single-search-component"
				}
			>
				{/* singleSearchComponent is module class. 
				But single-search-component was needed to target the classes of MUI Autocomplete. 
				This class is styled in searchBox.css*/}
				<label className={styles.labelTextUser}>
					{labelText}
					{children}
				</label>
				<AirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={target}
					labelText={labelText}
					customTheme={customTheme}
					outerTheme={outerTheme}
					customSX={{ width: 200 }}
					classNameValue="airport-selection"
					airportNameError={airportErrorTarget}
					refTarget={refTarget}
				/>
				<p
					className={
						target?.name
							? styles.selectedAirportName
							: `${styles.selectedAirportName} ${styles.selectedAirportError}`
					}
				>
					{target?.name ? (
						target.name
					) : (
						<span className={styles.airportNameError}>
							Please select an Airport
						</span>
					)}
				</p>
			</div>
		</>
	);
}
