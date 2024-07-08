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
			{allDataLoaded && <HotelSearchBar key={allDataLoaded} />}

			<Container
				maxWidth="lg"
				style={{
					position: "relative",
					top: "80px",
					border: "2px solid red",
				}}
			>
				<div>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Ducimus, voluptas dicta veniam aperiam a
						doloremque molestias expedita perferendis minima amet
						quam qui quidem quod enim, sunt, rem vitae nam debitis.
					</p>
					{hotelNotFound && <span>HOTEL NOT FOUND</span>}
				</div>
				{width > 500 && (
					<div className="flights-filter-box">
						<h3>FILTER</h3>
					</div>
				)}
				<HotelList
					hotelNotFound={hotelNotFound}
					updateFetchingHotels={updateFetchingHotels}
					sortOptions={sortOptions}
				/>
			</Container>
		</div>
	);
}
