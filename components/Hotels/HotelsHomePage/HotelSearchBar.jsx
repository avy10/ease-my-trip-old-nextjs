import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HotelCitySelector from "./HotelSearchBar/HotelCitySelector";
import HotelDateSelector from "./HotelSearchBar/HotelDateSelector";
import HotelPricePaxSelector from "./HotelSearchBar/HotelPricePaxSelector";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

export default function HotelSearchBar({ hotelNotFound, setHotelNotFound }) {
	const router = useRouter();
	const hotelSearchData = useHotelSearchContext();
	const {
		updateHotelCity,
		hotelCity,
		checkInDate,
		checkOutDate,
		updateHotelsDate,
		today,
		maxBookingDate,
	} = hotelSearchData;

	const [selectedHotelCity, setSelectedHotelCity] = useState(hotelCity);
	function updateSelectedHotelCity(newCitySelected) {
		setSelectedHotelCity(newCitySelected);
	}
	const [searchCheckInDate, setSearchCheckInDate] = useState(checkInDate);
	const [searchCheckOutDate, setSearchCheckOutDate] = useState(checkOutDate);
	function updateSearchDates(target, newDate) {
		if (target === "checkIn") {
			setSearchCheckInDate(newDate);
		} else if (target === "checkOut") {
			setSearchCheckOutDate(newDate);
		}
	}
	// ERROR IN DAY
	const [checkINDayError, setCheckINDayError] = useState(false);
	const [checkOUTDayError, setCheckOUTDayError] = useState(false);
	useEffect(() => {
		if (
			searchCheckInDate.$y < today.$y &&
			searchCheckInDate.$M < today.$M &&
			searchCheckInDate.$D < today.$D &&
			searchCheckInDate <= maxBookingDate
		) {
			setCheckINDayError(true);
		}
		if (
			searchCheckOutDate.$y < today.$y &&
			searchCheckOutDate.$M < today.$M &&
			searchCheckOutDate.$D < today.$D &&
			searchCheckOutDate <= maxBookingDate
		) {
			setCheckOUTDayError(true);
		}
		if (
			searchCheckInDate.$y >= today.$y &&
			searchCheckInDate.$M >= today.$M &&
			searchCheckInDate.$D >= today.$D &&
			searchCheckInDate <= maxBookingDate
		) {
			setCheckINDayError(false);
		}
		if (
			searchCheckOutDate.$y >= today.$y &&
			searchCheckOutDate.$M >= today.$M &&
			searchCheckOutDate.$D >= today.$D &&
			searchCheckOutDate <= maxBookingDate
		) {
			setCheckOUTDayError(false);
		}
		searchCheckOutDate < searchCheckInDate && setCheckOUTDayError(true);
		searchCheckInDate > maxBookingDate && setCheckINDayError(true);
		if (
			searchCheckInDate > maxBookingDate ||
			searchCheckOutDate > maxBookingDate
		) {
			setCheckINDayError(true);
			setCheckOUTDayError(true);
			// return;
		}

		if (searchCheckInDate >= today && searchCheckInDate <= maxBookingDate) {
			setCheckINDayError(false);
		}
		if (
			searchCheckOutDate >= today &&
			searchCheckOutDate <= maxBookingDate
		) {
			setCheckOUTDayError(false);
		}
		if (searchCheckOutDate >= searchCheckInDate) {
			setCheckOUTDayError(false);
		}
	}, [
		searchCheckInDate,
		searchCheckOutDate,
		setCheckINDayError,
		setCheckOUTDayError,
	]);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	function handleSnackBarOpen() {
		setOpenSnackBar(true);
	}
	function handleSnackBarClose() {
		setOpenSnackBar(false);
	}
	const [snackBarMSG, setSnackBarMSG] = useState(
		"Source and Destination should not be same"
	);
	useEffect(() => {
		if (hotelNotFound === true) {
			setOpenSnackBar(true);
			setSnackBarMSG("Hotel for the Selected city not found");
			setHotelNotFound(false);
		}
	}, [hotelNotFound]);

	async function handleSearch() {
		/* _id: "65292ae86ea9a006f4ad6855",
		cityState: "Mumbai, Maharashtra",
		__v: 0, */
		if (
			selectedHotelCity?.cityState == null ||
			selectedHotelCity?.cityState == undefined
		) {
			setSnackBarMSG("Please select a City first");
			handleSnackBarOpen();
			return;
		}
		if (checkINDayError) {
			setSnackBarMSG("Incorrect Check IN Date");
			handleSnackBarOpen();
			return;
		}
		if (checkOUTDayError) {
			setSnackBarMSG("Incorrect Check OUT Date");
			handleSnackBarOpen();
			return;
		}
		/* updateHotelCity(selectedHotelCity);
		updateHotelsDate("checkIn", searchCheckInDate);
		updateHotelsDate("checkOut", searchCheckOutDate); */
		const routerCheckInDate = dayjs(searchCheckInDate).format("DD-MM-YYYY");
		const routerCheckOutDate =
			dayjs(searchCheckOutDate).format("DD-MM-YYYY");
		const selectedCity = selectedHotelCity.cityState.split(",").at(0);
		const sortParams = JSON.stringify({ rating: "-1" });
		const encodedSortParams = encodeURIComponent(sortParams);

		await router.push(
			`/hotels/search?city=${selectedCity}&cid=${routerCheckInDate}&cod=${routerCheckOutDate}&sort=${encodedSortParams}`
		);
		updateHotelCity(selectedHotelCity);
		updateHotelsDate("checkIn", searchCheckInDate);
		updateHotelsDate("checkOut", searchCheckOutDate);
	}

	const action = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleSnackBarClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);
	return (
		<div className="hotel-search-bar-main-div ">
			<Snackbar
				open={openSnackBar}
				autoHideDuration={3000}
				onClose={handleSnackBarClose}
				message={snackBarMSG}
				action={action}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			/>
			<div className="hotel-search-box-div ">
				<HotelCitySelector
					selectedHotelCity={selectedHotelCity}
					updateSelectedHotelCity={updateSelectedHotelCity}
				/>
				<HotelDateSelector
					searchCheckInDate={searchCheckInDate}
					searchCheckOutDate={searchCheckOutDate}
					updateSearchDates={updateSearchDates}
				/>
				<HotelPricePaxSelector />
				<div className="search-button-div">
					<div className="avy-date-container"></div>
					<p></p>
					<button onClick={handleSearch} className="search-button">
						Search
					</button>
					<p></p>
				</div>
			</div>
		</div>
	);
}
