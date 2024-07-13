import { useState, useEffect } from "react";

export default function InputCheckBox({
	labelValue,
	ratingFilters,
	setRatingFilters,
	ratingCheckedObject,
	setRatingCheckedObject,
}) {
	const [ischecked, setIsChecked] = useState(false);
	function onClickEventHandler(e) {
		const antiChecked = !ischecked;
		setIsChecked(antiChecked);
		console.log(+e.target.value);
		const ratingValue = +e.target.value;
		const ratingCheckedObjectClone = {
			...ratingCheckedObject,
		};
		ratingCheckedObjectClone[ratingValue] = antiChecked;
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
		} else if (maxNumber === minNumber) {
			setRatingFilters(maxNumber);
		} else {
			setRatingFilters({ $gte: maxNumber, $lte: minNumber });
		}
		// console.table(ratingCheckedObjectClone);
		setRatingCheckedObject(ratingCheckedObjectClone);
	}

	return (
		<div>
			<input
				type="checkbox"
				value={labelValue}
				onChange={(e) => onClickEventHandler(e)}
			/>
			<label>
				{labelValue}
				{/* {ischecked ? "AA" : "BB"} */}
			</label>
		</div>
	);
}
