import { useFlightSearch } from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
// find css in styles\flightSearch\oneWayStyles\dateCard.css
export default function DateCard({ searchButtonOnclickStateReset }) {
	const flightSearchData = useFlightSearch();
	// const today = useState(dayjs());
	const { day, returnDay } = flightSearchData;
	const [datesArray, setDatesArray] = useState([]);
	const router = useRouter();
	function createDateArray() {
		const today = dayjs();
		const { day } = router.query;
		let dayFullExpanded = dayjs(day, "DD-MM-YYYY");
		const maxFlightBookingDay = today.add(8, "months");
		const todayISO = today.toISOString();
		const differenceBetweenTodayandFlightDay = dayFullExpanded.diff(
			today,
			"day"
		);
		console.log("differenceBetweenTodayandFlightDay", dayjs(day));
		const tempArray = [];
		if (differenceBetweenTodayandFlightDay <= 3) {
			console.log("I AM RUNNING");
			tempArray.push(today);
			for (let i = 1; i <= 6; i++) {
				tempArray.push(today.add(i, "day"));
			}
			setDatesArray(tempArray);
		} else {
			// console.log(
			// 	"NO IAM IAM I AM RUNNING INSIDE DATE CARD",
			// 	dayFullExpanded.format("DD-MM-YYYY"),
			// 	maxFlightBookingDay.format("DD-MM-YYYY")
			// );
			tempArray.push(dayFullExpanded);
			[1, 2, 3].forEach((ele) => {
				const newDate = dayFullExpanded.add(ele, "day");
				console.log(
					"INSIDE THE DATE ARRAY CREATION",
					newDate.format("DD-MM-YYYY"),
					maxFlightBookingDay.format("DD-MM-YYYY"),
					newDate.format("DD-MM-YYYY") <=
						maxFlightBookingDay.format("DD-MM-YYYY")
				);
				const difference = maxFlightBookingDay.diff(newDate);

				if (difference > 0) {
					tempArray.push(newDate);
				}
			});

			// tempArray.push(dayFullExpanded.add(1, "day"));
			// tempArray.push(dayFullExpanded.add(2, "day"));
			// tempArray.push(dayFullExpanded.add(3, "day"));

			tempArray.unshift(dayFullExpanded.subtract(1, "day"));
			tempArray.unshift(dayFullExpanded.subtract(2, "day"));
			tempArray.unshift(dayFullExpanded.subtract(3, "day"));
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
	}, [router.isReady]);

	useEffect(() => {
		console.log("datesArray", datesArray);
	}, [datesArray]);

	function handleClick(dateReceived) {
		const { src, dest, day, notv, sort, filter } = router.query;
		const newDate = dayjs(dateReceived, "DD-MM-YYYY").format("DD-MM-YYYY");
		const requiredObjects = {
			src,
			dest,
			day: newDate,
			notv,
			sort,
			filter,
		};
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...requiredObjects,
				},
			},
			undefined,
			{ shallow: true }
		);
		searchButtonOnclickStateReset();
	}

	const BootstrapTooltip = styled(({ className, ...props }) => (
		<Tooltip
			{...props}
			arrow
			classes={{ popper: className }}
			slotProps={{
				popper: {
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -15],
							},
						},
					],
				},
			}}
		/>
	))(({ theme }) => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: theme.palette.common.black,
		},
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.black,
		},
	}));
	return (
		<div className="date-card-main ">
			{datesArray.length != 0 &&
				datesArray.map((ele, ind) => (
					<BootstrapTooltip
						title="Show flights without resetting filters"
						key={ind}
					>
						<div
							className={
								dayjs(ele).format("MMM DD") ==
								dayjs(day).format("MMM DD")
									? "active"
									: ""
							}
							key={ind}
							onClick={() => handleClick(ele)}
						>
							{dayjs(ele).format("MMM DD")}
						</div>
					</BootstrapTooltip>
				))}
		</div>
	);
}

{
	/* <li key={ind}>{`${ele.$D} ${dayjs().month()}`}</li> */
}
