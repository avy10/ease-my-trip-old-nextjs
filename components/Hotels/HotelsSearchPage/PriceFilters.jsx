import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
const PRICE_ARR = [
	{
		priceName: "Below 1500",
		priceValueLow: 0,
		priceValueHigh: 1500,
	},
	{
		priceName: "1500 - 2500",
		priceValueLow: 1500,
		priceValueHigh: 2500,
	},
	{
		priceName: "2500 - 5500",
		priceValueLow: 2500,
		priceValueHigh: 5500,
	},
	{
		priceName: "5500 - 8500",
		priceValueLow: 5500,
		priceValueHigh: 8500,
	},
	{
		priceName: "8500 - 15500",
		priceValueLow: 8500,
		priceValueHigh: 15500,
	},
	{
		priceName: "15500 - 30000",
		priceValueLow: 15500,
		priceValueHigh: 30000,
	},
	{
		priceName: "Above 30000",
		priceValueLow: 30000,
		priceValueHigh: 1000000000,
	},
];
export default function PriceFilters() {
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
	function updatePriceFilters(priceValue, index, isChecked) {
		const priceCheckedObjectClone = { ...priceCheckedObject };
		priceCheckedObjectClone[index] = isChecked;
		let minNumber = 1000000009;
		let maxNumber = -1;
		Object.keys(priceCheckedObjectClone).map((ele) => {
			if (priceCheckedObjectClone[ele]) {
			}
		});
	}
	return (
		<div className="hotel-prices-filter-box">
			<p className="filter-box-name">
				Price <span>(per person per night)</span>
			</p>
			<ul style={{ listStyleType: "none" }}>
				{PRICE_ARR.map((ele, ind) => (
					<li key={ind}>
						<PriceList labelValue={ele?.priceName} />
					</li>
				))}
			</ul>
		</div>
	);
}
// updateRatingFilters={updateRatingFilters}

function PriceList({ labelValue, updateRatingFilters }) {
	const [ischecked, setIsChecked] = useState(false);
	function onClickEventHandler(e) {
		const antiChecked = !ischecked;
		setIsChecked(antiChecked);
		const ratingValue = +e.target.value;
		console.log(ratingValue);
		// updateRatingFilters(ratingValue, antiChecked);
	}
	return (
		<div>
			<Checkbox
				value={labelValue}
				inputProps={{ "aria-label": `${labelValue} star hotels` }}
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
			<label>{labelValue}</label>
		</div>
	);
}
