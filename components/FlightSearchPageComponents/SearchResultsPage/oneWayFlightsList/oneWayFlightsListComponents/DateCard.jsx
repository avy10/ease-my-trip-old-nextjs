import { useFlightSearch } from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
// find css in styles\flightSearch\oneWayStyles\dateCard.css
export default function DateCard() {
	const flightSearchData = useFlightSearch();
	// const today = useState(dayjs());
	const { day, returnDay } = flightSearchData;
	const [datesArray, setDatesArray] = useState([]);

	function createDateArray() {
		const today = dayjs();
		const todayISO = today.toISOString();
		const differenceBetweenTodayandFlightDay = day.diff(today, "day");
		console.log("differenceBetweenTodayandFlightDay", dayjs(todayISO));
		const tempArray = [];
		if (differenceBetweenTodayandFlightDay <= 3) {
			console.log("I AM RUNNING");
			tempArray.push(today);
			for (let i = 1; i <= 6; i++) {
				tempArray.push(today.add(i, "day"));
			}
			setDatesArray(tempArray);
		} else {
			console.log("NO IAM IAM I AM RUNNING");
			tempArray.push(day);
			tempArray.push(day.add(1, "day"));
			tempArray.push(day.add(2, "day"));
			tempArray.push(day.add(3, "day"));
			tempArray.unshift(day.subtract(1, "day"));
			tempArray.unshift(day.subtract(2, "day"));
			tempArray.unshift(day.subtract(3, "day"));
			setDatesArray(tempArray);
		}
	}
	useEffect(() => {
		// const date1 = today.add(28, "day"); // June 02
		// const date2 = today.add(26, "day");
		// console.log(today);
		// console.log("date1", date1);
		// console.log("date2", date2);
		// const aaa = date1 - date2;
		// console.log(date1.diff(date2, "day"));
		createDateArray();
	}, []);

	useEffect(() => {
		console.log("datesArray", datesArray);
	}, [datesArray]);
	return (
		<div className="date-card-main ">
			{datesArray.length != 0 &&
				datesArray.map((ele, ind) => (
					<div
						className={
							dayjs(ele).format("MMM DD") ==
							dayjs(day).format("MMM DD")
								? "active"
								: ""
						}
						key={ind}
					>
						{dayjs(ele).format("MMM DD")}
					</div>
				))}
		</div>
	);
}

{
	/* <li key={ind}>{`${ele.$D} ${dayjs().month()}`}</li> */
}
