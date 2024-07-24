// const NAV_TABS = ["Rooms", "Overview", "Amenities", "Booking Policy"];
// data not available for Overview

const NAV_TABS = ["Rooms", "Amenities", "Booking Policy", "Guest Rating"];
export default function HotelDetailsNavigations() {
	return (
		<div className="hotel-details-navigation">
			{NAV_TABS.map((ele, index) => (
				<p key={index}>{ele}</p>
			))}
		</div>
	);
}
