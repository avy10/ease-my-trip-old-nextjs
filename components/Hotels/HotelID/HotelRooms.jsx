import { ROOM_ICONS } from "@/public/utils/roomIcons";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styles from "./HotelRooms.module.css";
import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
export default function HotelRooms({ hotelRooms }) {
	return (
		<div className={styles.hotelRoomsContainer}>
			<TopBar />
			<RoomsList hotelRooms={hotelRooms} />
		</div>
	);
	// return (
	// 	<div className="hotel-rooms-container">
	// 		<TopBar />
	// 		<RoomsList hotelRooms={hotelRooms} />
	// 	</div>
	// );
}

function TopBar() {
	return (
		<div className={styles.hotelRoomsTopbar}>
			{/* <p>Room Type</p>
			<p>Price per Night</p> */}
			<p>Select your Room</p>
		</div>
	);
	// return (
	// 	<div className="hotel-rooms-topbar">
	// 		<p>Room Type</p>
	// 		<p>Price per Night</p>
	// 	</div>
	// );
}

function RoomsList({ hotelRooms }) {
	return (
		<div className={styles.roomsList}>
			{hotelRooms.map((ele, ind) => (
				<SingleRoom roomData={ele} key={ele.roomNumberS} />
			))}
		</div>
	);
}

function SingleRoom({ roomData }) {
	const bedDetails = roomData?.bedDetail.split(" ");
	bedDetails.shift();
	const bedType = bedDetails.join(" ");
	const roomIndicator = roomData?.roomType + "_" + bedDetails[0];
	const taxes = Math.ceil((18 * roomData?.costPerNight) / 100).toFixed(0);
	const increasedMarkUp =
		+roomData?.costPerNight +
		+Math.ceil((35 * roomData?.costPerNight) / 100).toFixed(0);
	return (
		<div className={styles.singleRoomData}>
			<RoomIcon
				roomType={roomData?.roomType}
				roomIndicator={roomIndicator}
				roomSize={roomData?.roomSize}
				bedType={bedType}
				cancellationPolicy={roomData?.cancellationPolicy}
			/>
			<RoomPrices
				taxes={taxes}
				increasedMarkUp={increasedMarkUp}
				roomSize={roomData?.roomSize}
				bedType={bedType}
				cancellationPolicy={roomData?.cancellationPolicy}
				costPerNight={roomData?.costPerNight}
			/>
		</div>
	);
}
function RoomPrices({
	taxes,
	increasedMarkUp,
	roomSize,
	bedType,
	cancellationPolicy,
	costPerNight,
}) {
	const { numRooms, numAdults } = useHotelSearchContext();

	return (
		<div
			className="room-price-amenities"
			style={{
				display: "flex",
				width: "100%",
				flexWrap: "wrap",
				justifyContent: "space-between",
			}}
		>
			<div className={styles.roomAmenities}>
				<div className={styles.bedRoomArea}>
					<p>{roomSize + " sq ft"}</p>
					<p>{bedType}</p>
				</div>
				<p>Breakfast included</p>
				<p>{cancellationPolicy}</p>
			</div>
			<div className={styles.roomPrices}>
				<p className={styles.bookingPersuasion}>
					<span>Book and Get </span>
					<CurrencyRupeeIcon
						style={{
							fontSize: "10px",
						}}
					/>
					<span>{increasedMarkUp - costPerNight} off</span>
				</p>
				<div className={styles.markedUpPrice}>
					<CurrencyRupeeIcon
						style={{
							fontSize: "12px",
							textDecoration: "line-through",
						}}
					/>
					{increasedMarkUp * numRooms}
				</div>
				<p className={styles.originalPrice}>
					<CurrencyRupeeIcon
						style={{
							fontSize: "20px",
						}}
					/>
					{Math.floor(costPerNight * numRooms)}
				</p>
				<p className={styles.taxes}>
					+
					<CurrencyRupeeIcon
						style={{
							fontSize: "10px",
						}}
					/>
					{taxes} Taxes and Fees
				</p>
				<p className={styles.taxes}>room price (per night)</p>
				<div className={styles.bookRoomNow}>
					<p>Book Now</p>
				</div>
			</div>
		</div>
	);
}
function RoomIcon({
	roomType,
	roomIndicator,
	roomSize,
	bedType,
	cancellationPolicy,
}) {
	// background-color: #ff00cb;
	// background-color: #ff0000;
	// background-color: #d8e516;
	// background-color: #36deb4;
	const backgroundColorSpan =
		roomType === "Suite"
			? "#ff0000"
			: roomType === "Double"
			? "#ff00cb"
			: roomType === "Single"
			? "#d8e516"
			: "#36deb4";
	return (
		<div className={styles.hotelRoomIcon}>
			<h3 className="hotel-room-name">
				{/* <span className="hotel-name-spacer">&nbsp;&nbsp;</span> */}
				<span
					className="hotel-name-spacer"
					style={{
						backgroundColor: backgroundColorSpan,
					}}
				>
					&nbsp;
				</span>

				{roomType + " " + bedType}
			</h3>
			<img src={ROOM_ICONS[roomIndicator]?.imageSrc} />
		</div>
	);
}
