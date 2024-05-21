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
// let locale = "en-in";
import dayjs from "dayjs";
import "dayjs/locale/en-in";
import "dayjs/locale/de";
import "dayjs/locale/it";
import "dayjs/locale/en-gb";
import { useFlightSearch } from "@/contexts/FlightSearchContext";
// import "dayjs/locale/en-us";

// import `dayjs/locale/${locale}`;

export default function BasicDatePicker({
	targetVALUE,
	labelText,
	paraText,
	updateTarget,
	updateState,

	children,

	classNameValueForPTag,
	classNameValueForDivTag,

	dateErrorTarget,
	updateErrorState,
	refTarget,
	keyVal,
	finalFlightBooking,
	slotPropsValue,
	minReturnDay = null,
}) {
	const searchData = useFlightSearch();
	const { userLocale } = searchData;
	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale={userLocale}
		>
			<div className={classNameValueForDivTag}>
				<p className={classNameValueForPTag}>
					{paraText}
					{children}
				</p>
				<DatePicker
					value={targetVALUE}
					onChange={(e) => {
						// console.log("datepicker event fire on onChange ", e);
						updateState(updateTarget, e);
					}}
					label={labelText}
					minDate={minReturnDay ? minReturnDay : dayjs()}
					maxDate={finalFlightBooking}
					slotProps={slotPropsValue}
					ref={refTarget}
					className={dateErrorTarget ? "date-picker-error" : ""}
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
