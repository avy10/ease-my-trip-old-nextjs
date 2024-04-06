import AirportAutoCompleteMUI from "@/components/Custom-MUI-Components/AirportAutoCompleteMUI";
export default function AirportSearchBoxes({
	airportNames,
	target,
	labelText,
	updateFlightSearchStates,
}) {
	return (
		<>
			<div className="single-search-component">
				<label>{labelText}</label>
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
