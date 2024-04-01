import { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
export default function BasicDatePicker({
	targetVALUE,
	labelText,
	paraText,
	minReturnDay = null,
	updateTarget,
	updateState,
	finalFlightBooking,
}) {
	const today = dayjs();

	const [selectedDate, setSelectedDate] = useState(dayjs());
	useEffect(() => {
		console.log(selectedDate.$d);
		updateState(updateTarget, selectedDate);
	}, [selectedDate]);
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="dateContainer">
				<p>{paraText}</p>
				<DatePicker
					value={targetVALUE}
					onChange={setSelectedDate}
					label={labelText}
					minDate={minReturnDay ? minReturnDay : today}
					maxDate={finalFlightBooking}
				/>
			</div>
		</LocalizationProvider>
	);
}
