import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFlightSearch } from "@/contexts/FlightSearchContext";
export default function OneWayQuickButtons({
	sortAirlines,
	searchButtonOnclickStateReset,
}) {
	const router = useRouter();
	const quickSortStates = useSearchResultsModificationContext();
	const { sortOptions } = quickSortStates;
	const flightSearchData = useFlightSearch();
	const { updateFlightSearchStates } = flightSearchData;
	const [presentDay, setPresentDay] = useState(null);
	const [isMinDate, setIsMinDate] = useState(false);
	const [isMaxDate, setIsMaxDate] = useState(false);
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
								offset: [0, -10],
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

	async function handleClick(action) {
		let { src, dest, day, notv, sort } = router.query;
		var customParseFormat = require("dayjs/plugin/customParseFormat");
		dayjs.extend(customParseFormat);
		const presentDate = dayjs(day, "DD-MM-YYYY");
		let newDate;
		if (action == "prev") {
			newDate = presentDate.subtract(1, "day");
		} else if (action == "next") {
			newDate = presentDate.add(1, "day");
		}
		day = newDate.format("DD-MM-YYYY");
		setPresentDay(day);
		updateFlightSearchStates("day", newDate);

		const requiredObjects = {
			src,
			dest,
			day,
			notv,
			sort,
		};
		await router.replace(
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

	useEffect(() => {
		const { day } = router.query;
		const presentDate = dayjs(day);
		const today = dayjs();
		const maxBookingDate = today.add(8, "months");
		const previousDate = presentDate.subtract(1, "day");
		const nextDate = presentDate.add(1, "day");
		if (previousDate < today) {
			setIsMinDate(true);
		} else if (previousDate > today) {
			setIsMinDate(false);
		}
		if (nextDate < maxBookingDate) {
			setIsMaxDate(false);
		} else if (nextDate > maxBookingDate) {
			setIsMaxDate(true);
		}
	}, [presentDay]);
	return (
		<div className="one-way-flights-quick-buttons">
			<div className="lhs-sort-buttons flex-center-center">
				<span>Sort By: </span>
				<button
					className={
						sortOptions?.ticketPrice == 1
							? "quick-sort-btn active-quick-sort-btn flex-center-center"
							: "quick-sort-btn flex-center-center"
					}
					onClick={() => sortAirlines({ ticketPrice: 1 })}
				>
					<span className="cheap-sort-span"></span>
					Cheapest
				</button>
				<button
					className={
						sortOptions?.duration == 1
							? "quick-sort-btn active-quick-sort-btn flex-center-center"
							: "quick-sort-btn flex-center-center"
					}
					onClick={() => sortAirlines({ duration: 1 })}
				>
					<span className="fastest-sort-span"></span>
					Fastest
				</button>
			</div>
			<div className="rhs-calendar-buttons ">
				<button
					onClick={() => handleClick("prev")}
					disabled={isMinDate}
				>
					<BootstrapTooltip title="Show previous day flights with filters reset">
						<span>Previous Day</span>
					</BootstrapTooltip>
				</button>
				<Divider
					orientation="vertical"
					variant="middle"
					flexItem
					sx={{ backgroundColor: "black" }}
				/>
				<button
					onClick={() => handleClick("next")}
					disabled={isMaxDate}
				>
					<BootstrapTooltip title="Show next day flights with filters reset">
						<span>Next Day</span>
					</BootstrapTooltip>
				</button>
			</div>
		</div>
	);
}
