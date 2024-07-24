import StarRating from "@/components/Custom-User-Components/StarRating";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./HotelSummaryImages.module.css";
import {
	HotelImageContainer,
	UserRating,
} from "@/components/Hotels/HotelsSearchPage/ImageAndRatingCard";
import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import { useEffect, useState } from "react";
import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
export default function HotelSummaryImages({ hotelData }) {
	const { width } = useAuthorisationContext();
	const [isMobile, setIsMobile] = useState(width > 500);
	useEffect(() => {
		if (width <= 500) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);
	return (
		<div
			className={styles.hotelSummaryImages + " " + "hotel-summary-images"}
		>
			<HotelNameRating
				hotelName={hotelData?.name}
				hotelRating={hotelData?.rating}
			/>
			<div className="hotel-image-first-room">
				<HotelImageContainer
					imageArray={hotelData?.images}
					maxImageLength={hotelData?.images?.length}
					containerWidth={isMobile ? "345px" : "600px"}
					containerHeight={isMobile ? "250px" : "400px"}
					renderChildren={true}
					isMobile={isMobile}
				/>
				<FirstHotelRoom
					hotelRoomData={hotelData?.rooms[0]}
					hotelAmenities={hotelData?.amenities}
					houseRules={hotelData?.houseRules}
				/>
			</div>
		</div>
	);
}

function HotelNameRating({ hotelName, hotelRating }) {
	return (
		<div className="hotel-name-ratings">
			<div className="hotel-name-star flex-center-center">
				<h3>{hotelName}</h3>
				<div className="hotel-star">
					<span>
						<StarRating
							size={16}
							defaultRating={Number(
								Math.floor(hotelRating).toFixed(0)
							)}
						/>
					</span>
					<span id="hotel-bordered-text">Hotel</span>
				</div>
			</div>
			<div className="hotel-user-rating">
				<UserRating />
			</div>
		</div>
	);
}

function FirstHotelRoom({ hotelRoomData, hotelAmenities, houseRules }) {
	const bedDetails = hotelRoomData?.bedDetail.split(" ");
	bedDetails.shift();
	const bedType = bedDetails.join(" ");
	const taxes = Math.ceil((18 * hotelRoomData?.costPerNight) / 100).toFixed(
		0
	);
	return (
		<div className="first-hotel-room">
			<FirstHotelNamePrice
				roomType={hotelRoomData?.roomType}
				bedType={bedType}
				costPerNight={hotelRoomData?.costPerNight}
				taxes={taxes}
			/>
			<FirstHotelAmenities
				hotelAmenities={hotelAmenities}
				houseRules={houseRules}
			/>
			<div className="first-hotel-buttons">
				<p className="select-room flex-center-center">Select Rooms</p>
				<p className="book-now flex-center-center">Book Now</p>
			</div>
		</div>
	);
}
function FirstHotelAmenities({ hotelAmenities, houseRules }) {
	// amenities array is present in hotelData and not in hotelRoomData, adjust the placement of this componenet accordingly
	return (
		<>
			<div className="first-hotel-amenities">
				{hotelAmenities?.map((element, index) => (
					<p key={index}>
						<CheckCircleIcon
							style={{
								backgroundColor: "white",
								color: "#12d612",
								fontSize: "14px",
							}}
						/>{" "}
						{element}
					</p>
				))}
			</div>
			<div className="first-hotel-amenities">
				{houseRules?.guestProfile?.unmarriedCouplesAllowed && (
					<p>
						<CheckCircleIcon
							style={{
								backgroundColor: "white",
								color: "#12d612",
								fontSize: "14px",
							}}
						/>{" "}
						Couple Friendly
					</p>
				)}
				{houseRules?.idProofRelated?.localIdsAllowed && (
					<p>
						<CheckCircleIcon
							style={{
								backgroundColor: "white",
								color: "#12d612",
								fontSize: "14px",
							}}
						/>{" "}
						Local IDs Accepted
					</p>
				)}
			</div>
			<div className="first-hotel-amenities">
				<p>ID accepted: </p>
				<div className="first-hotel-amenities">
					{houseRules?.restrictions?.idProofsAccepted?.map(
						(ele, ind) => (
							<p>
								<CheckCircleIcon
									style={{
										backgroundColor: "white",
										color: "#12d612",
										fontSize: "14px",
									}}
								/>{" "}
								{ele}
							</p>
						)
					)}
				</div>
			</div>
		</>
	);
}
function FirstHotelNamePrice({ roomType, bedType, costPerNight, taxes }) {
	const { numRooms, numAdults } = useHotelSearchContext();

	const markedUpPrice = (
		costPerNight + Math.ceil((35 * costPerNight) / 100)
	).toFixed(0);
	return (
		<div className="hotel-name-price">
			<div className="first-hotel-name">
				<h4>
					<span className="hotel-name-spacer">&nbsp;</span>
					{roomType} {bedType}
				</h4>
				<p>
					{numRooms} x Room | {numAdults} x Guests
				</p>
			</div>
			<div className="first-hotel-price flex-center-center">
				<div className="original-fake-price flex-center-center">
					{/* there is no data in API indicating original price and discounted price
				simply adding 179 to all prices */}
					<CurrencyRupeeIcon
						style={{
							fontSize: "12px",
							textDecoration: "line-through",
						}}
					/>

					{/* {Math.round(hotelPrice) + 179} */}
					{markedUpPrice * numRooms}
				</div>
				<p className="first-hotel-price-value flex-center-center">
					<CurrencyRupeeIcon />
					{Math.floor(costPerNight * numRooms)}
				</p>
				<p className="first-hotel-price-labels">
					{"+"}
					{taxes * numRooms}
					{" Taxes and Fees"}
				</p>
				<p className="first-hotel-price-labels">
					{"base price (per night)"}
				</p>
			</div>
		</div>
	);
}
