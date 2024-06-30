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

export default function HotelSearchBar() {
	const router = useRouter();
	const hotelSearchData = useHotelSearchContext();
	const {
		updateCityList,
		hotelCity,
		checkInDate,
		checkOutDate,
		checkINDayError,
		checkOUTDayError,
	} = hotelSearchData;

	const [selectedHotelCity, setSelectedHotelCity] = useState(hotelCity);
	function updateSelectedHotelCity(newCitySelected) {
		setSelectedHotelCity(newCitySelected);
	}

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

	function handleSearch() {
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
		updateCityList(selectedHotelCity);
		const routerCheckInDate = dayjs(checkInDate).format("DD-MM-YYYY");
		const routerCheckOutDate = dayjs(checkOutDate).format("DD-MM-YYYY");
		router.push(`/hotels/search`);
	}
	useEffect(() => {
		const myHeaders = new Headers();
		myHeaders.append("projectID", "$4xh7gn2pv8it");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(
			"https://academics.newtonschool.co/api/v1/bookingportals/city?limit=100",
			requestOptions
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((result) => updateCityList(result?.data?.cities))
			.catch((error) => console.error(error));
	}, []);
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
				<HotelDateSelector />
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
