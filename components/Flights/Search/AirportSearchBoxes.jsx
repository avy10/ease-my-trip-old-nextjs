import AirportAutoCompleteMUI from "@/components/Custom-MUI-Components/AirportAutoCompleteMUI";
export default function AirportSearchBoxes({
	airportNames,
	target,
	labelText,
	updateFlightSearchStates,
}) {
	return (
		<>
			<div className="singleSearchComponent">
				<label>{labelText}</label>
				<AirportAutoCompleteMUI
					optionsName={airportNames}
					airportSelection={target}
					labelText={labelText}
				/>
				<p>
					{target?.name ? (
						target.name
					) : (
						<span className="errorAirportName">
							Select an Airport
						</span>
					)}
				</p>
			</div>
		</>
	);
}
