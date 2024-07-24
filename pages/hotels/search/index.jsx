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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import RatingFilters from "@/components/Hotels/HotelsSearchPage/RatingFilters";
import PriceFilters from "@/components/Hotels/HotelsSearchPage/PriceFilters";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};

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
	const [filterReset, setFilterReset] = useState(false);
	function updateFilterReset(value) {
		setFilterReset(value);
	}
	const [componentKey, setComponentKey] = useState(1); // use it to force re-render when filter reset is clicked
	const [fetchingHotels, setFetchingHotels] = useState(false);
	function updateFetchingHotels(newValue) {
		setFetchingHotels(newValue);
	}
	const [showModal, setShowModal] = useState(false);
	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);
	const router = useRouter();
	function onLoad() {
		// http://localhost:3000/hotels/search?city=Mumbai&cid=02-07-2024&cod=02-07-2024
		const { city, cid, cod, sort } = router.query;
		console.log("CITYLIST", city, cid);
		// if (city === undefined) return;
		if (cityList.length == 0) {
			return;
		}
		let cityFound = undefined;

		cityList.forEach((ele) => {
			if (cityFound === undefined) {
				if (
					ele.cityState.split(",").at(0).toLowerCase() ===
					city?.toLowerCase()
				) {
					cityFound = ele;
				}
			}
		});
		if (!cityFound) {
			console.log("I AM RUNNING", cityFound, city);
			setHotelNotFound(true);
			setAllDataLoaded(true);
			setTimeout(() => {
				router.push("/hotels");
			}, 2500);
			return;
		} else {
			console.log("I AM ", cityFound, city);
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
			style={{ backgroundColor: "white" }}
			key={hotelCity?.cityState + checkInDate + checkOutDate}
		>
			{allDataLoaded && (
				<HotelSearchBar
					hotelNotFound={hotelNotFound}
					setHotelNotFound={setHotelNotFound}
				/>
			)}

			<Container
				maxWidth="lg"
				style={{
					position: "relative",
					top: "80px",
				}}
			>
				{width > 500 && (
					<HotelFilters
						setFilterOptions={setFilterOptions}
						filterReset={filterReset}
						updateFilterReset={updateFilterReset}
						key={componentKey}
						setComponentKey={setComponentKey}
					/>
				)}
				{width < 500 && (
					<div>
						<p onClick={handleOpen} className="reset-hotel-filters">
							FILTERS
						</p>
						<Modal
							open={showModal}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
							className="login-modal-backdrop"
						>
							<Box sx={style} className="login-modal">
								<HotelFilters
									key={componentKey}
									setComponentKey={setComponentKey}
									setFilterOptions={setFilterOptions}
									filterReset={filterReset}
									updateFilterReset={updateFilterReset}
								/>
							</Box>
						</Modal>
					</div>
				)}
				{allDataLoaded && (
					<HotelList
						hotelNotFound={hotelNotFound}
						updateFetchingHotels={updateFetchingHotels}
						sortOptions={sortOptions}
						updateSortOptions={updateSortOptions}
						filterOptions={filterOptions}
					/>
				)}
			</Container>
		</div>
	);
}

function HotelFilters({
	setFilterOptions,
	filterReset,
	updateFilterReset,
	setComponentKey,
}) {
	// CSS in hotelSearchHotelList.css

	return (
		<div className="flights-filter-box" id="hotel-filter-style">
			<h3>FILTER</h3>
			<hr />
			<RatingFilters
				setFilterOptions={setFilterOptions}
				filterReset={filterReset}
				updateFilterReset={updateFilterReset}
			/>
			<hr />
			<PriceFilters
				setFilterOptions={setFilterOptions}
				filterReset={filterReset}
				updateFilterReset={updateFilterReset}
			/>
			<hr />
			<div
				className="reset-hotel-filters"
				onClick={() => {
					setFilterOptions({});
					setComponentKey((prev) => prev + 1);
				}}
			>
				Reset Filters
			</div>
		</div>
	);
}
