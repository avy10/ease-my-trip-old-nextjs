import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { useRouter } from "next/router";

export default function RangeSlider({ updateFlightResultsLoading }) {
	const router = useRouter();
	const [value, setValue] = useState([0, 500]);
	const [minAndMaxValue, setMinAndMaxValue] = useState([0, 500]);
	const [minAndMaxOnceUpdate, setMinAndMaxOnceUpdate] = useState(false);
	const [range, setRange] = useState(10);
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { filterOptions, updateFilterOptions } = flightSearchModificationCS;
	function updateMinAndMaxValue(flightList, valueZero, valueOne) {
		let maxValue = Number.MIN_VALUE;
		let minValue = Number.MAX_VALUE;
		flightList.forEach((ele) => {
			maxValue = ele.ticketPrice >= maxValue ? ele.ticketPrice : maxValue;
			minValue = ele.ticketPrice <= minValue ? ele.ticketPrice : minValue;
		});

		console.log("MIN VALUE MAX VALUE", minValue, maxValue);
		if (valueOne !== undefined) {
			setValue([valueZero, valueOne]);
		} else {
			setValue([minValue, maxValue]);
		}
		setMinAndMaxValue([minValue, maxValue]);
	}
	useEffect(() => {
		if (minAndMaxOnceUpdate) return;
		const valueZero = filterOptions?.ticketPrice?.$gte;
		const valueOne = filterOptions?.ticketPrice?.$lte;
		console.log(
			"VALUE ZERO AND VALUE ONE INSIDE THE RANGE SLIDER",
			valueOne,
			valueZero
		);
		const { src, dest, day, notv } = router.query;
		const flightDayWeekName = dayjs(day).format("ddd");
		const url =
			`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"` +
			src +
			`","destination":"` +
			dest +
			`"}&day=` +
			flightDayWeekName;
		fetch(url, {
			method: "GET",
			headers: {
				projectID: "qwqzgpiy336h",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data?.data?.flights);
				updateMinAndMaxValue(data?.data?.flights, valueZero, valueOne);
				setMinAndMaxOnceUpdate(true);
			});
	}, []);
	// useEffect(() => {
	// 	// if (minAndMaxOnceUpdate) return;
	// 	console.log("filterOptions inside rangeSlider", filterOptions);
	// 	const valueZero = filterOptions?.ticketPrice?.$gte;
	// 	const valueOne = filterOptions?.ticketPrice?.$lte;
	// 	if (valueZero && value[0] == 0) {
	// 		setValue([valueZero, valueOne]);
	// 	}
	// 	console.log("filterOptions inside rangeSlider", valueZero, valueOne);
	// 	/* filterOptions ??
	// 		setValue(
	// 			filterOptions?.ticketPrice?.$gte,
	// 			filterOptions?.ticketPrice?.$lte
	// 		); */
	// }, [filterOptions]);
	// useEffect(() => {
	// 	if (originalFlightList.length == 0) return;
	// 	if (minAndMaxOnceUpdate) return;
	// 	updateMinAndMaxValue();
	// 	setMinAndMaxOnceUpdate(true);
	// }, [originalFlightList]);
	useEffect(() => {
		const difference = value[1] - value[0];
		if (difference >= 2000) {
			setRange(1000);
		} else if (difference < 2000 && difference >= 1000) {
			setRange(500);
		} else if (difference < 1000 && difference >= 500) {
			setRange(100);
		} else if (difference < 500 && difference > 100) {
			setRange(50);
		} else {
			setRange(difference);
		}

		if (
			value[0] == minAndMaxValue[0] &&
			value[1] == minAndMaxValue[1] &&
			minAndMaxOnceUpdate
		) {
			applyFilter("removeTicketPrice");
		}
	}, [value]);
	const handleChange = (event, newValue) => {
		console.log(newValue);
		const diff = newValue[1] - newValue[0];
		if (diff >= 100) {
			console.log("I AM UPDATING");
			setValue(newValue);
		}
	};

	function valuetext(value) {
		return `${value}°C`;
	}

	function applyFilter(avy) {
		// updateFlightResultsLoading(true);
		const { src, dest, day, notv, sort, filter } = router.query;
		const a = JSON.parse(decodeURIComponent(sort));
		const obj = { ...router.query, sort: a };
		const requiredObjects = {
			src,
			dest,
			day,
			notv,
			sort,
		};
		let filterOldDecoded;
		if (filter) {
			filterOldDecoded = JSON.parse(decodeURIComponent(filter));
		}
		console.log("FILTER FROM URL PARAMS", filterOldDecoded);
		const newFilter = {
			...filterOldDecoded,
			ticketPrice: {
				$lte: value[1],
				$gte: value[0],
			},
		};
		if (avy == "removeTicketPrice") {
			delete newFilter.ticketPrice;
		}
		console.log("VERY NEW FILTER", newFilter);
		const stringifiedFilterValue = JSON.stringify(newFilter);
		// filter={ "duration" : {"$lte":3,"$gte":0},
		const encodedFilters = encodeURIComponent(stringifiedFilterValue);
		updateFilterOptions(newFilter);
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...requiredObjects,
					filter: encodedFilters,
				},
			},
			undefined,
			{ shallow: true }
		);
	}

	return (
		<Box className="slider-box-filter-box">
			<Slider
				getAriaLabel={() => "Price range"}
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
				min={minAndMaxValue[0]}
				max={minAndMaxValue[1]}
				step={range}
				onMouseUp={() => {
					// console.log(
					// 	"Mouse released",
					// 	router.asPath,
					// 	router.pathname
					// )
					applyFilter();
				}}
			/>
			<div className="slider-values">
				<p>
					<CurrencyRupeeIcon className="rupee-symbol-in-filter-box" />
					{value[0]}
				</p>
				<p>
					<CurrencyRupeeIcon className="rupee-symbol-in-filter-box" />
					{value[1]}
				</p>
			</div>
		</Box>
	);
}
