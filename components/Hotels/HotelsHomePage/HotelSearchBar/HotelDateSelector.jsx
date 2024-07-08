import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";

export default function HotelDateSelector({
	searchCheckInDate,
	searchCheckOutDate,
	updateSearchDates,
}) {
	const hotelSearchData = useHotelSearchContext();
	const {
		checkInDate,
		checkOutDate,
		updateHotelsDate,
		today,
		maxBookingDate,
	} = hotelSearchData;
	return (
		<div id="hotel-date-selector">
			<div id="hotel-checkin-date">
				<label className="label-text-user">
					<span>Check IN date</span>
				</label>
				<BasicDatePicker
					targetVALUE={searchCheckInDate}
					labelText={"Select CheckIn date"}
					minReturnDay={today}
					finalFlightBooking={maxBookingDate}
					updateTarget="checkIn"
					updateState={updateSearchDates}
				/>
			</div>
			<div id="hotel-checkout-date">
				<label className="label-text-user">
					<span>Check OUT date</span>
				</label>
				<BasicDatePicker
					targetVALUE={searchCheckOutDate}
					labelText={"Select CheckOut date"}
					minReturnDay={searchCheckInDate}
					finalFlightBooking={maxBookingDate}
					updateTarget="checkOut"
					updateState={updateSearchDates}
				/>
			</div>
		</div>
	);
}
