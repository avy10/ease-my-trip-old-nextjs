import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
const PRICE_ARR = [
	{
		priceName: "Below 1500",
		priceValue: { priceValueLow: 0, priceValueHigh: 1500 },
	},
	{
		priceName: "1500 - 2500",
		priceValue: { priceValueLow: 1500, priceValueHigh: 2500 },
	},
	{
		priceName: "2500 - 5500",
		priceValue: { priceValueLow: 2500, priceValueHigh: 5500 },
	},
	{
		priceName: "5500 - 8500",
		priceValue: { priceValueLow: 5500, priceValueHigh: 8500 },
	},
	{
		priceName: "8500 - 15500",
		priceValue: { priceValueLow: 8500, priceValueHigh: 15500 },
	},
	{
		priceName: "15500 - 30000",
		priceValue: { priceValueLow: 15500, priceValueHigh: 30000 },
	},
	{
		priceName: "Above 30000",
		priceValue: { priceValueLow: 30000, priceValueHigh: 1000000000 },
	},
];
export default function PriceFilters({ setFilterOptions }) {
	const [priceFilters, setPriceFilters] = useState({
		$lte: undefined,
		$gte: undefined,
	});
	const [priceCheckedObject, setPriceCheckedObject] = useState({
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
	});
	function updatePriceFilters(index, isChecked) {
		const priceCheckedObjectClone = { ...priceCheckedObject };
		priceCheckedObjectClone[index] = isChecked;
		console.table(priceCheckedObjectClone);
		let minNumber = 1000000009;
		let maxNumber = -1;

		console.log(maxNumber, minNumber);
		Object.keys(priceCheckedObjectClone).map((ele, eleIndex) => {
			if (priceCheckedObjectClone[ele]) {
				console.table(PRICE_ARR[eleIndex].priceValue);
				const maxPriceValue =
					PRICE_ARR[eleIndex].priceValue?.priceValueHigh;
				const minPriceValue =
					PRICE_ARR[eleIndex].priceValue?.priceValueLow;
				console.log("before", maxPriceValue, minPriceValue);
				maxNumber =
					maxPriceValue > maxNumber ? maxPriceValue : maxNumber;
				minNumber =
					minPriceValue < minNumber ? minPriceValue : minNumber;
			}
		});
		console.log("at the end", maxNumber, minNumber);
		setPriceFilters({
			$lte: maxNumber,
			$gte: minNumber,
		});
		if (maxNumber === -1 && minNumber === 1000000009) {
			setFilterOptions((prev) => {
				const previousFilters = { ...prev };
				delete previousFilters.avgCostPerNight;
				return previousFilters;
				// setFilterOptions(previousFilters)
			});
		} else {
			setFilterOptions((prev) => {
				const previousFilters = {
					...prev,
					avgCostPerNight: {
						$lte: maxNumber,
						$gte: minNumber,
					},
				};
				return previousFilters;
				// setFilterOptions(previousFilters)
			});
		}
		setPriceCheckedObject(priceCheckedObjectClone);
	}
	return (
		<div className="hotel-prices-filter-box">
			<p className="filter-box-name">
				Price <span>(per person per night)</span>
			</p>
			<ul style={{ listStyleType: "none" }}>
				{PRICE_ARR.map((ele, ind) => (
					<li key={ind}>
						<PriceList
							priceElement={ele}
							priceName={ele?.priceName}
							updatePriceFilters={updatePriceFilters}
							priceIndex={ind + 1}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
// updateRatingFilters={updateRatingFilters}

function PriceList({
	priceElement,
	priceName,
	priceIndex,
	updatePriceFilters,
}) {
	const [ischecked, setIsChecked] = useState(false);
	function onClickEventHandler(e) {
		const antiChecked = !ischecked;
		setIsChecked(antiChecked);
		const ratingValue = e.target.value;
		console.log(ratingValue);
		// updatePriceFilters(ratingValue, priceIndex, antiChecked);
		updatePriceFilters(priceIndex, antiChecked);
	}

	return (
		<div>
			<Checkbox
				value={priceIndex}
				inputProps={{
					"aria-label": `price range filters for range ${priceName}`,
				}}
				sx={{
					color: "#2196F3",
					"&.Mui-checked": {
						color: "#2196F3",
					},
					"& .MuiSvgIcon-root": { fontSize: 20 },
				}}
				checked={ischecked}
				onChange={(e) => onClickEventHandler(e)}
			/>
			<label>{priceName}</label>
		</div>
	);
}
