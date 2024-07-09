// css : hotelSearchHotelList.css
import StarRating from "@/components/Custom-User-Components/StarRating";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getRandomNumber } from "@/public/utils/getRandomNumber";
import PlaceIcon from "@mui/icons-material/Place";
import ImageAndRatingCard from "./ImageAndRatingCard";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import ListAmenities, {
	CancellationBreakfast,
	HotelDiscount,
	PeopleViewing,
} from "./ListAmenities";
import { useRouter } from "next/router";
export default function HotelList({
	hotelNotFound,
	updateFetchingHotels,
	sortOptions,
	updateSortOptions,
}) {
	const router = useRouter();
	const [hotelsList, setHotelsList] = useState([]);
	const [errorInFetch, setErrorInFetch] = useState(false);
	const { width } = useAuthorisationContext();
	const { hotelCity } = useHotelSearchContext();
	const [pageLimiter, setPageLimiter] = useState(12);
	const [maxPage, setMaxPage] = useState(30);
	async function fetchHotels(selectedHotelCity) {
		// https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"delhi"}&limit=10
		try {
			const URL = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${selectedHotelCity}"}&sort=${JSON.stringify(
				sortOptions
			)}&limit=${pageLimiter}`;
			console.log(URL, "/n", sortOptions);
			const myHeaders = new Headers();
			myHeaders.append("projectID", "$4xh7gn2pv8it");

			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			await fetch(URL, requestOptions)
				.then((response) => response.json())
				.then((result) => {
					setMaxPage(result?.totalResults);
					setHotelsList(result?.data?.hotels);
				})
				.catch((error) => console.error(error));
		} catch (error) {
			setErrorInFetch(true);
			console.log(error);
		} finally {
			updateFetchingHotels(false);
		}
	}
	async function setNewSortFilterURL() {
		const { city, cid, cod } = router.query;
		const sortParams = JSON.stringify(sortOptions);
		const encodedSortParams = encodeURIComponent(sortParams);
		await router.push(
			`/hotels/search?city=${city}&cid=${cid}&cod=${cod}&sort=${encodedSortParams}`
		);
	}
	useEffect(() => {
		setNewSortFilterURL();
	}, [sortOptions]);
	useEffect(() => {
		const hotelCitySplitArray = hotelCity.cityState.split(",");
		const selectedCity =
			hotelCitySplitArray.at(0) + "," + hotelCitySplitArray.at(1);
		console.log(selectedCity);
		updateFetchingHotels(true);
		fetchHotels(selectedCity);
	}, [pageLimiter, sortOptions]);
	useEffect(() => {
		function handleScroll() {
			console.log(pageLimiter);

			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight - 250) {
				setPageLimiter((prev) => prev + 12);
			}
		}
		if (pageLimiter >= maxPage) {
			window.removeEventListener("scroll", handleScroll);
			return;
		}

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pageLimiter, setPageLimiter, maxPage]);
	return (
		<div
			className="hotels-list-container"
			style={{
				float: `${width > 500 ? "right" : "none"}`,
			}}
		>
			<HotelSortButtons
				sortOptions={sortOptions}
				updateSortOptions={updateSortOptions}
			/>
			{hotelsList.map((element, index) => (
				<SingleHotelCard hotel={element} key={element?._id} />
			))}
		</div>
	);
}

function SingleHotelCard({ hotel }) {
	return (
		<div className="single-hotel-card">
			<ImageAndRatingCard
				imageArray={hotel?.images}
				rating={hotel?.rating}
			/>
			<div className="hotel-brief-details">
				<HotelNameLocation
					hotelName={hotel?.name}
					hotelLocation={hotel?.location}
				/>
				<HotelServices
					hotelAmneties={hotel?.amenities}
					hotelHouseRules={hotel?.houseRules}
					hotelPrice={hotel?.avgCostPerNight}
				/>
			</div>
		</div>
	);
}

function HotelNameLocation({ hotelName, hotelLocation }) {
	return (
		<div className="hotel-name-div">
			<h3>
				<span className="hotel-name-spacer">&nbsp;&nbsp;</span>
				{hotelName}
			</h3>
			<p className="hotel-location">
				<PlaceIcon style={{ fontSize: "12px" }} />
				{hotelLocation}
			</p>
		</div>
	);
}

function HotelServices({ hotelAmneties, hotelHouseRules, hotelPrice }) {
	return (
		<div className="hotel-services-div">
			<HotelAmenities
				hotelAmneties={hotelAmneties}
				hotelHouseRules={hotelHouseRules}
			/>
			<HotelPriceIndicator hotelPrice={hotelPrice} />
		</div>
	);
}

function HotelAmenities({ hotelAmneties, hotelHouseRules }) {
	return (
		<div className="hotel-rules-amenities">
			<ListAmenities
				hotelAmneties={hotelAmneties}
				hotelHouseRules={hotelHouseRules}
			/>
			<CancellationBreakfast />
			<PeopleViewing />
			<HotelDiscount />
		</div>
	);
}

function HotelPriceIndicator({ hotelPrice }) {
	return (
		<div className="hotel-price-indicator">
			<div className="original-fake-price flex-center-center">
				{/* there is no data in API indicating original price and discounted price
				simply adding 179 to all prices */}
				<CurrencyRupeeIcon
					style={{ fontSize: "12px", textDecoration: "line-through" }}
				/>

				{Math.round(hotelPrice) + 179}
			</div>
			<div className="avg-cost-div flex-center-center">
				<CurrencyRupeeIcon />
				{Math.round(hotelPrice)}
			</div>
			<p>+ Taxes and Fees</p>
			<p>Avg Cost per night</p>
			<div className="view-hotel-room">View Room</div>
		</div>
	);
}
/* hotelsArray.forEach(ele => {
let minCost = 1000000000;
ele.rooms.forEach(ele => minCost = ele.costDetails.baseCost <= minCost ? ele.costDetails.baseCost : minCost )
console.log(minCost)
}) */

function HotelSortButtons({ sortOptions, updateSortOptions }) {
	return (
		<div className="sort-options-flight-search">
			<p
				onClick={() =>
					updateSortOptions(
						sortOptions?.name == 1 ? { name: -1 } : { name: 1 }
					)
				}
			>
				NAME {sortOptions?.name == null && <UnfoldMoreIcon />}
				{sortOptions?.name == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.name == -1 && <KeyboardArrowDownIcon />}
			</p>
			<p
				onClick={() =>
					updateSortOptions(
						sortOptions?._id == 1 ? { _id: -1 } : { _id: 1 }
					)
				}
			>
				POPULARITY {sortOptions?._id == null && <UnfoldMoreIcon />}
				{sortOptions?._id == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?._id == -1 && <KeyboardArrowDownIcon />}
			</p>
			<p
				onClick={() =>
					updateSortOptions(
						sortOptions?.avgCostPerNight == 1
							? { avgCostPerNight: -1 }
							: { avgCostPerNight: 1 }
					)
				}
			>
				PRICE{" "}
				{sortOptions?.avgCostPerNight == null && <UnfoldMoreIcon />}
				{sortOptions?.avgCostPerNight == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.avgCostPerNight == -1 && (
					<KeyboardArrowDownIcon />
				)}
			</p>
			<p
				onClick={() =>
					updateSortOptions(
						sortOptions?.rating == 1
							? { rating: -1 }
							: { rating: 1 }
					)
				}
			>
				RATING {sortOptions?.rating == null && <UnfoldMoreIcon />}
				{sortOptions?.rating == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.rating == -1 && <KeyboardArrowDownIcon />}
			</p>
		</div>
	);
}
