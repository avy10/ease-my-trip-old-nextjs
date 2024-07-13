import FilterBox from "@/components/FlightSearchPageComponents/SearchResultsPage/FilterBox";
import HotelSearchBar from "@/components/Hotels/HotelsHomePage/HotelSearchBar";
import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // ES 2015
import locale_en_in from "dayjs/locale/en-in";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import HotelList from "@/components/Hotels/HotelsSearchPage/HotelList";
// https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"Hyderabad"}&filter={"rating":4}
// https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"Hyderabad"}&sort{"avgCostPerNight":1}&filter={"avgCostPerNight":{"$lte":9500,"$gte":7000}}
// https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"Hyderabad"}&sort{"avgCostPerNight":1}&filter={"amenities":"Free WiFi"}

import InputCheckBox from "@/components/Custom-User-Components/InputCheckBox";
import RatingFilters from "@/components/Hotels/HotelsSearchPage/RatingFilters";
export default function HotelSearch() {
	dayjs.extend(customParseFormat);
	const hotelSearchContextData = useHotelSearchContext();
	const { width } = useAuthorisationContext();
	const {
		cityList,
		hotelCity,
		updateHotelCity,
		updateHotelsDate,
		checkInDate,
		checkOutDate,
	} = hotelSearchContextData;
	const [hotelNotFound, setHotelNotFound] = useState("loading");
	const [allDataLoaded, setAllDataLoaded] = useState(false);
	const [sortOptions, setSortOptions] = useState({ avgCostPerNight: "1" });
	function updateSortOptions(newObject) {
		setSortOptions(newObject);
	}
	const [filterOptions, setFilterOptions] = useState({});

	const [fetchingHotels, setFetchingHotels] = useState(false);
	function updateFetchingHotels(newValue) {
		setFetchingHotels(newValue);
	}

	const router = useRouter();
	function onLoad() {
		// http://localhost:3000/hotels/search?city=Mumbai&cid=02-07-2024&cod=02-07-2024
		const { city, cid, cod, sort } = router.query;
		// console.log("CITYLIST", cityList);
		if (cityList.length == 0) {
			return;
		}
		let cityFound = undefined;

		cityList.forEach((ele) => {
			if (!cityFound) {
				if (
					ele.cityState.split(",").at(0).toLowerCase() ===
					city.toLowerCase()
				) {
					cityFound = ele;
				}
			}
		});
		if (!cityFound) {
			setHotelNotFound(true);
			setAllDataLoaded(true);
			// setTimeout(() => {
			// 	router.push("/hotels");
			// }, 2000);
			return;
		} else {
			setHotelNotFound(false);
			updateHotelCity(cityFound);
		}
		const newCID = dayjs(cid, "DD-MM-YYYY", "en-in");
		updateHotelsDate("checkIn", newCID);
		const newCOD = dayjs(cod, "DD-MM-YYYY", "en-in");
		updateHotelsDate("checkOut", newCOD);
		const sortOptionsDecoded = JSON.parse(decodeURIComponent(sort));
		setSortOptions(sortOptionsDecoded);

		setAllDataLoaded(true);
	}
	useEffect(() => {
		if (cityList.length == 0) return;
		onLoad();
	}, [cityList]);

	return (
		<div
			style={{ backgroundColor: "aqua" }}
			key={hotelCity?.cityState + checkInDate + checkOutDate}
		>
			{allDataLoaded && (
				<HotelSearchBar
					hotelNotFound={hotelNotFound}
					key={allDataLoaded}
					setHotelNotFound={setHotelNotFound}
				/>
			)}

			<Container
				maxWidth="lg"
				style={{
					position: "relative",
					top: "80px",
					border: "2px solid red",
				}}
			>
				{width > 500 && (
					<div className="flights-filter-box">
						<h3>FILTER</h3>
						<hr />
						<RatingFilters setFilterOptions={setFilterOptions} />
						<hr />
						<hr />
						<hr />
					</div>
				)}
				<HotelList
					hotelNotFound={hotelNotFound}
					updateFetchingHotels={updateFetchingHotels}
					sortOptions={sortOptions}
					updateSortOptions={updateSortOptions}
					filterOptions={filterOptions}
				/>
			</Container>
		</div>
	);
}

// function InputCheckBox({
// 	labelValue,
// 	ratingFilters,
// 	setRatingFilters,
// 	ratingCheckedObject,
// 	setRatingCheckedObject,
// }) {
// 	const [ischecked, setIsChecked] = useState(false);
// 	function onClickEventHandler(e) {
// 		const antiChecked = !ischecked;
// 		setIsChecked(antiChecked);
// 		// console.log(typeof +e.target.value);
// 		const ratingValue = +e.target.value;
// 		if (antiChecked) {
// 			if (
// 				ratingFilters.$gte == undefined &&
// 				ratingFilters.$lte == undefined
// 			) {
// 				setRatingFilters({ $gte: ratingValue, $lte: ratingValue });
// 			} else {
// 				console.log("I AM RUNNING", ratingValue, ratingFilters.$lte);
// 				const gteValue =
// 					ratingValue > ratingFilters.$gte
// 						? ratingValue
// 						: ratingFilters.$gte;
// 				const lteValue =
// 					ratingValue < ratingFilters.$lte
// 						? ratingValue
// 						: ratingFilters.$lte;
// 				setRatingFilters({ $lte: lteValue, $gte: gteValue });
// 			}
// 		}

// 		if (!antiChecked) {
// 			const ratingFiltersGTE = ratingFilters.$gte;
// 			const ratingFiltersLTE = ratingFilters.$lte;
// 			if (ratingFiltersGTE == ratingFiltersLTE) {
// 				setRatingFilters({ $lte: undefined, $gte: undefined });
// 			} else if (
// 				ratingFiltersGTE > ratingValue &&
// 				ratingValue > ratingFiltersLTE
// 			) {
// 				return;
// 			} else if (ratingFiltersGTE > ratingValue) {
// 				// rethink
// 				setRatingFilters((prevState) => {
// 					return { ...prevState, $lte: ratingFiltersGTE };
// 				});
// 			} else if (ratingFiltersGTE == ratingValue) {
// 				setRatingFilters((prevState) => {
// 					return { ...prevState, $gte: ratingFiltersLTE };
// 				});
// 			}
// 		}
// 	}

// 	return (
// 		<div>
// 			<input
// 				type="checkbox"
// 				value={labelValue}
// 				onChange={(e) => onClickEventHandler(e)}
// 			/>
// 			<label>
// 				{labelValue}
// 				{ischecked ? "AA" : "BB"}
// 			</label>
// 		</div>
// 	);
// }
