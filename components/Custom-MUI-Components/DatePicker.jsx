// import { useContext, useEffect, useState } from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import "dayjs/locale/en-in";

// export default function BasicDatePicker({
// 	targetVALUE,
// 	labelText,
// 	paraText,
// 	minReturnDay = null,
// 	updateTarget,
// 	updateState,
// 	finalFlightBooking,
// 	children,
// 	classNameValueForPTag,
// 	classNameValueForDivTag,
// 	slotPropsValue,
// 	refTarget,
// 	updateErrorState,
// 	dateErrorTarget,
// 	keyVal,
// }) {
// 	const today = dayjs();

// 	const [selectedDate, setSelectedDate] = useState(dayjs());
// 	useEffect(() => {
// 		console.log(selectedDate);
// 		updateState(updateTarget, selectedDate);
// 		if (updateTarget == "day") {
// 			// updateState("returnDay", selectedDate);
// 		}
// 		if (selectedDate < today || selectedDate > finalFlightBooking) {
// 			updateErrorState(keyVal, true);
// 		} else {
// 			updateErrorState(keyVal, false);
// 		}
// 	}, [selectedDate]);
// 	return (
// 		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
// 			<div className={classNameValueForDivTag}>
// 				<p className={classNameValueForPTag}>
// 					{paraText}
// 					{children}
// 				</p>
// 				<DatePicker
// 					value={targetVALUE}
// 					onChange={setSelectedDate}
// 					label={labelText}
// 					minDate={minReturnDay ? minReturnDay : today}
// 					maxDate={finalFlightBooking}
// 					slotProps={slotPropsValue}
// 					ref={refTarget}
// 				/>
// 				<p>
// 					{dateErrorTarget && (
// 						<span className="error-airport-name">Invalid Date</span>
// 					)}
// 				</p>
// 			</div>
// 		</LocalizationProvider>
// 	);
// }
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
	classNameValueForPTag,
	classNameValueForDivTag,
	slotPropsValue,
	refTarget,
	updateErrorState,
	dateErrorTarget,
	keyVal,
}) {
	useEffect(() => {
		if (targetVALUE > finalFlightBooking) {
			// console.log("I AM RUNNOING FOR ", updateTarget);
			// console.log("day", targetVALUE);
			// console.log("finalFlightBooking", finalFlightBooking);
			updateErrorState(keyVal, true);
		} else {
			// console.log("day es", targetVALUE);
			// console.log("finalFlightBooking es", finalFlightBooking);
			updateErrorState(keyVal, false);
		}
	}, [targetVALUE]);
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
			<div className={classNameValueForDivTag}>
				<p className={classNameValueForPTag}>
					{paraText}
					{children}
				</p>
				<DatePicker
					value={targetVALUE}
					onChange={(e) => {
						// console.log("datepicker ", e);
						updateState(updateTarget, e);
					}}
					label={labelText}
					minDate={minReturnDay ? minReturnDay : targetVALUE}
					maxDate={finalFlightBooking}
					slotProps={slotPropsValue}
					ref={refTarget}
				/>
				<p>
					{dateErrorTarget && (
						<span className="error-airport-name">Invalid Date</span>
					)}
				</p>
			</div>
		</LocalizationProvider>
	);
}
