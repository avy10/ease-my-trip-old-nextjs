import dayjs from "dayjs";
import { createContext, useContext, useState, useEffect } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const HotelSearchContext = createContext();
export default HotelSearchContext;

export function HotelSearchProvider({ children }) {
	// CITY LIST
	const [cityList, setCityList] = useState([]);
	function updateCityList(cityArr) {
		setCityList(cityArr);
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

	// SELECTED CITY
	const [hotelCity, setHotelCity] = useState({
		_id: "65292ae86ea9a006f4ad6855",
		cityState: "Mumbai, Maharashtra",
		__v: 0,
	});
	function updateHotelCity(newCity) {
		setHotelCity(newCity);
	}
	// CHECK IN
	const [checkInDate, setCheckInDate] = useState(dayjs());
	// CHECK OUT
	const [checkOutDate, setCheckOutDate] = useState(dayjs());
	// update checkIn checkOut dates
	function updateHotelsDate(target, newDate) {
		if (target == "checkIn") {
			setCheckInDate(newDate);
		}
		if (target == "checkOut") {
			setCheckOutDate(newDate);
		}
	}
	const today = dayjs();
	const maxBookingDate = today.add(9, "months");

	// // ERROR IN DAY
	// const [checkINDayError, setCheckINDayError] = useState(false);
	// const [checkOUTDayError, setCheckOUTDayError] = useState(false);
	// useEffect(() => {
	// 	if (
	// 		checkInDate.$y < today.$y &&
	// 		checkInDate.$M < today.$M &&
	// 		checkInDate.$D < today.$D &&
	// 		checkInDate <= maxBookingDate
	// 	) {
	// 		setCheckINDayError(true);
	// 	}
	// 	if (
	// 		checkOutDate.$y < today.$y &&
	// 		checkOutDate.$M < today.$M &&
	// 		checkOutDate.$D < today.$D &&
	// 		checkOutDate <= maxBookingDate
	// 	) {
	// 		setCheckOUTDayError(true);
	// 	}
	// 	if (
	// 		checkInDate.$y >= today.$y &&
	// 		checkInDate.$M >= today.$M &&
	// 		checkInDate.$D >= today.$D &&
	// 		checkInDate <= maxBookingDate
	// 	) {
	// 		setCheckINDayError(false);
	// 	}
	// 	if (
	// 		checkOutDate.$y >= today.$y &&
	// 		checkOutDate.$M >= today.$M &&
	// 		checkOutDate.$D >= today.$D &&
	// 		checkOutDate <= maxBookingDate
	// 	) {
	// 		setCheckOUTDayError(false);
	// 	}
	// 	checkOutDate < checkInDate && setCheckOUTDayError(true);
	// 	if (checkInDate > maxBookingDate || checkOutDate > maxBookingDate) {
	// 		setCheckINDayError(true);
	// 		setCheckOUTDayError(true);
	// 		return;
	// 	}
	// 	if (checkInDate >= today && checkInDate <= maxBookingDate) {
	// 		setCheckINDayError(false);
	// 	}
	// 	if (checkOutDate >= today && checkOutDate <= maxBookingDate) {
	// 		setCheckOUTDayError(false);
	// 	}
	// 	if (checkOutDate >= checkInDate) {
	// 		setCheckOUTDayError(false);
	// 	}
	// }, [checkInDate, checkOutDate]);

	// R00MS AND GUESTS
	const [numRooms, setNumRooms] = useState(1);
	const [numAdults, setNumAdults] = useState(1);
	const [numChildren, setNumChildren] = useState(0);
	function updateRoomsGuests(target, action) {
		if (target == "rooms") {
			if (action == "inc") {
				const newValue = numRooms + 1;
				setNumRooms(newValue > 8 ? 8 : newValue);
			}
			if (action == "dec") {
				const newValue = numRooms - 1;
				setNumRooms(newValue <= 1 ? 1 : newValue);
			}
		}
		if (target == "adults") {
			if (action == "inc") {
				const newValue = numAdults + 1;
				const autoRoomsRequired = Math.ceil(newValue / 2);
				setNumAdults(newValue > 12 ? 12 : newValue);
				setNumRooms(autoRoomsRequired > 6 ? 6 : autoRoomsRequired);
			}
			if (action == "dec") {
				const newValue = numAdults - 1;
				const autoRoomsRequired = Math.ceil(newValue / 2);
				setNumAdults(newValue <= 1 ? 1 : newValue);
				setNumRooms(autoRoomsRequired <= 1 ? 1 : autoRoomsRequired);
			}
		}
		if (target == "children") {
			if (action == "inc") {
				const newValue = numChildren + 1;
				setNumChildren(
					newValue > numRooms * 2 ? numRooms * 2 : newValue
				);
			}
			if (action == "dec") {
				const newValue = numChildren - 1;
				setNumChildren(newValue <= 0 ? 0 : newValue);
			}
		}
	}

	// children age // IGNORED
	const [ageChildOne, setAgeChildOne] = useState(1);
	const [ageChildTwo, setAgeChildTwo] = useState(1);
	// price value
	const [priceValue, setPriceValue] = useState(
		<span>
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			100 -
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			1500,
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			1500 -
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			2500
		</span>
	);
	function updatePriceValue(newValue) {
		setPriceValue(newValue);
	}

	return (
		<HotelSearchContext.Provider
			value={{
				cityList,
				updateCityList,
				hotelCity,
				updateHotelCity,
				checkInDate,
				checkOutDate,
				updateHotelsDate,
				today,
				maxBookingDate,
				numRooms,
				numAdults,
				numChildren,
				updateRoomsGuests,
				// checkINDayError,
				// checkOUTDayError,
				priceValue,
				updatePriceValue,
			}}
		>
			{children}
		</HotelSearchContext.Provider>
	);
}

export function useHotelSearchContext() {
	return useContext(HotelSearchContext);
}
