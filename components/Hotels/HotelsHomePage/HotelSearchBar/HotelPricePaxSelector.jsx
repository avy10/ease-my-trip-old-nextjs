import { createContext, useContext, useState } from "react";
import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function HotelPricePaxSelector() {
	const [showMorePax, setShowMorePax] = useState(false);
	function updateShowMorePax(newValue) {
		if (newValue) {
			setShowMorePax(newValue);
		} else {
			setShowMorePax((prev) => !prev);
		}
	}
	return (
		<div id="hotel-pax-price-selector">
			<div id="hotel-room-pax-selector">
				<label className="label-text-user">
					<span>Rooms and Guests</span>
				</label>
				<div id="hotel-pax-div">
					<HotelPax updateShowMorePax={updateShowMorePax} />
					{showMorePax && (
						<ChooseMorePax updateShowMorePax={updateShowMorePax} />
					)}
				</div>
			</div>
			<div id="hotel-price-range-selector">
				<label className="label-text-user">
					<span>Price per Night</span>
				</label>
				<PricePerNightMainDiv />
			</div>
		</div>
	);
}
function HotelPax({ updateShowMorePax }) {
	const hotelSearchData = useHotelSearchContext();
	const { numRooms, numAdults, numChildren } = hotelSearchData;

	return (
		<>
			<div
				className="pax-details flex-center-center"
				onClick={() => updateShowMorePax()}
			>
				<span className="pax-dets-bold">{numRooms}</span>
				<span className="pax-dets-smol">Room</span>
				<span className="pax-dets-bold">{numAdults + numChildren}</span>
				<span className="pax-dets-smol">Guests</span>
				<span className="pax-dets-smol">
					<KeyboardArrowDownIcon sx={{ fontSize: "20px" }} />
				</span>
			</div>
		</>
	);
}
function ChooseMorePax({ updateShowMorePax }) {
	const hotelSearchData = useHotelSearchContext();
	const { numRooms, numAdults, numChildren, updateRoomsGuests } =
		hotelSearchData;
	return (
		<div id="choose-more-hotel-pax">
			<ChooseMorePaxSingleBox
				paraOne={numRooms == 1 ? "Room" : "Rooms"}
				stateData={numRooms}
				updateState={updateRoomsGuests}
				updateStateTarget="rooms"
			/>

			<ChooseMorePaxSingleBox
				paraOne={numAdults == 1 ? "Adult" : "Adults"}
				paraTwo={"(Above 12 years)"}
				stateData={numAdults}
				updateState={updateRoomsGuests}
				updateStateTarget="adults"
			/>
			<ChooseMorePaxSingleBox
				paraOne={numChildren == 1 ? "Child" : "Children"}
				paraTwo={"(Below 12 years)"}
				stateData={numChildren}
				updateState={updateRoomsGuests}
				updateStateTarget="children"
			/>

			{/* <div id="choose-more-hotel-pax-children"></div> */}
		</div>
	);
}
function ChooseMorePaxSingleBox({
	paraOne,
	paraTwo = undefined,
	stateData,
	updateState,
	updateStateTarget,
}) {
	function clickHandler(action) {
		updateState(updateStateTarget, action);
	}
	return (
		<div className="choose-more-hotel-pax-single-div" id="adult">
			<div className="more-hotel-max-lhs">
				<p>{paraOne}</p>
				{paraTwo && <p>{paraTwo}</p>}
			</div>
			<div className="more-hotel-max-rhs">
				<span id="dec-btn" onClick={() => clickHandler("dec")}>
					-
				</span>
				<span id="state-data">{stateData}</span>
				<span id="inc-btn" onClick={() => clickHandler("inc")}>
					+
				</span>
			</div>
		</div>
	);
}

function PricePerNightMainDiv() {
	const hotelSearchData = useHotelSearchContext();
	const { priceValue, updatePriceValue } = hotelSearchData;
	const priceOptions = [
		<span>
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			100 -
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			1500
		</span>,
		<span>
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			1500 -
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			2500
		</span>,
		<span>
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			2500 -
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			5000
		</span>,
		<span>
			<CurrencyRupeeIcon id="hotel-price-range-currency" />
			5000+
		</span>,
	];
	const [showPriceMenu, setShowPriceMenu] = useState(false);
	return (
		<div id="hotel-price-range-menu">
			<p onClick={() => setShowPriceMenu((prev) => !prev)}>
				{priceValue}
			</p>
			{showPriceMenu && (
				<div>
					<ul>
						{priceOptions.map((ele, ind) => (
							<li
								onClick={() => {
									setShowPriceMenu(false);
									updatePriceValue(ele);
								}}
								key={ind}
							>
								{ele}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
