import { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-in";

export default function BasicDatePicker({
	targetVALUE,
	labelText,
	paraText,
	minReturnDay = null,
	updateTarget,
	updateState,
	finalFlightBooking,
	children,
}) {
	const today = dayjs();

	const [selectedDate, setSelectedDate] = useState(dayjs());
	const [dateError, setDateError] = useState(false);
	useEffect(() => {
		// console.log(selectedDate.$d);
		updateState(updateTarget, selectedDate);
		if (selectedDate < today || selectedDate > finalFlightBooking) {
			setDateError(true);
		} else {
			setDateError(false);
		}
	}, [selectedDate]);
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
			<div className="date-container">
				<p className="label-text-user">
					{paraText}
					{children}
				</p>
				<DatePicker
					value={targetVALUE}
					onChange={setSelectedDate}
					label={labelText}
					minDate={minReturnDay ? minReturnDay : today}
					maxDate={finalFlightBooking}
				/>
				<p>
					{dateError && (
						<span className="error-airport-name">Invalid Date</span>
					)}
				</p>
			</div>
		</LocalizationProvider>
	);
}
