import AirportAutoCompleteMUI from "@/components/Custom-MUI-Components/AirportAutoCompleteMUI";

import { createTheme, useTheme } from "@mui/material/styles";
export default function AirportSearchBoxes({
	airportNames,
	target,
	labelText,

	children,
}) {
	// "--TextField-brandBorderColor": "#E0E3E7",
	// "--TextField-brandBorderHoverColor": "#E0E3E7",
	// "--TextField-brandBorderFocusedColor": "#E0E3E7",
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
			<div className="single-search-component">
				<label className="label-text-user">
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
				/>
				<p className="selected-airport-name">
					{target?.name ? (
						target.name
					) : (
						<span className="error-airport-name">
							Select an Airport
						</span>
					)}
				</p>
			</div>
		</>
	);
}
