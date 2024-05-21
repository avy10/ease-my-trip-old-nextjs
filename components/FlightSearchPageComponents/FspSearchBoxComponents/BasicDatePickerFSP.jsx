import { useFlightSearch } from "@/contexts/FlightSearchContext";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function BasicDatePickerFSP({
	targetVALUE,
	dispatch,
	labelText,
	paraText,
	type,
	keyToUpdate,
	children,

	classNameValueForPTag,
	classNameValueForDivTag,

	dateErrorTarget,
	refTarget,
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
						dispatch({
							type,
							payload: e,
							keyToUpdate,
						});
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
