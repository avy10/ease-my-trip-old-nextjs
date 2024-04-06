import AirportAutoCompleteMUI from "@/components/Custom-MUI-Components/AirportAutoCompleteMUI";

export default function AirportSearchBoxes({
	airportNames,
	target,
	labelText,
	updateFlightSearchStates,
	children,
}) {
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
