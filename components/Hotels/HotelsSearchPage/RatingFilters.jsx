import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

export default function RatingFilters({ setFilterOptions }) {
	const [ratingFilters, setRatingFilters] = useState({
		$lte: undefined,
		$gte: undefined,
	});
	const [ratingCheckedObject, setRatingCheckedObject] = useState({
		5: false,
		4: false,
		3: false,
		2: false,
		1: false,
	});
	function updateRatingFilters(ratingValue, isChecked) {
		const ratingCheckedObjectClone = {
			...ratingCheckedObject,
		};
		ratingCheckedObjectClone[ratingValue] = isChecked;
		let minNumber = 6;
		let maxNumber = -1;
		Object.keys(ratingCheckedObjectClone).map((ele) => {
			if (ratingCheckedObjectClone[ele]) {
				maxNumber = ele > maxNumber ? ele : maxNumber;
				minNumber = ele < minNumber ? ele : minNumber;
			}
		});
		if (minNumber === 6 && maxNumber == -1) {
			setRatingFilters({
				$lte: undefined,
				$gte: undefined,
			});
			setFilterOptions((prev) => {
				const prevFilters = { ...prev };
				delete prevFilters.rating;
				return prevFilters;
			});
		} else if (maxNumber === minNumber) {
			setRatingFilters(maxNumber);
			setFilterOptions((prev) => {
				const prevFilters = { ...prev };
				delete prevFilters.rating;
				prevFilters.rating = maxNumber;
				return prevFilters;
			});
		} else {
			setRatingFilters({ $gte: minNumber, $lte: maxNumber });
			setFilterOptions((prev) => {
				const prevFilters = { ...prev };
				delete prevFilters.rating;
				prevFilters.rating = {
					$lte: maxNumber,
					$gte: minNumber,
				};
				return prevFilters;
			});
		}
		setRatingCheckedObject(ratingCheckedObjectClone);
	}
	return (
		<div className="hotel-rating-filter-box">
			<p className="filter-box-name">Hotel Rating</p>
			<ul style={{ listStyleType: "none" }}>
				{[5, 4, 3, 2, 1].map((ele, ind) => (
					<li key={ele}>
						<RatingList
							labelValue={ele}
							updateRatingFilters={updateRatingFilters}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

function RatingList({ labelValue, updateRatingFilters }) {
	const [ischecked, setIsChecked] = useState(false);
	function onClickEventHandler(e) {
		const antiChecked = !ischecked;
		setIsChecked(antiChecked);
		const ratingValue = +e.target.value;
		console.log(ratingValue);
		updateRatingFilters(ratingValue, antiChecked);
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
			<label>{labelValue} Star</label>
		</div>
	);
}
