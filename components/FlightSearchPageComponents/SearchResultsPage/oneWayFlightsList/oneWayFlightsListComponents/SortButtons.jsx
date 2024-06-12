// css : styles\flightSearch\oneWayStyles\sortButtons.css

import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { useRouter } from "next/router";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import StraightIcon from "@mui/icons-material/Straight";
import NorthIcon from "@mui/icons-material/North";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function SortButtons({ sortAirlines }) {
	const router = useRouter();
	const flightSearchModificationCS = useSearchResultsModificationContext();
	const { sortOptions, updateSortOptions } = flightSearchModificationCS;

	return (
		<div className="sort-options-flight-search">
			<p
				onClick={() =>
					sortAirlines(
						sortOptions?.airline == 1
							? { airline: -1 }
							: { airline: 1 }
					)
				}
			>
				AIRLINES{sortOptions?.airline == null && <UnfoldMoreIcon />}
				{sortOptions?.airline == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.airline == -1 && <KeyboardArrowDownIcon />}
			</p>
			<p
				onClick={() =>
					sortAirlines(
						sortOptions?.departureTime == 1
							? { departureTime: -1 }
							: { departureTime: 1 }
					)
				}
			>
				DEPARTURE
				{sortOptions?.departureTime == null && <UnfoldMoreIcon />}
				{sortOptions?.departureTime == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.departureTime == -1 && <KeyboardArrowDownIcon />}
			</p>
			<p
				onClick={() =>
					sortAirlines(
						sortOptions?.arrivalTime == 1
							? { arrivalTime: -1 }
							: { arrivalTime: 1 }
					)
				}
			>
				ARRIVAL
				{sortOptions?.arrivalTime == null && <UnfoldMoreIcon />}
				{sortOptions?.arrivalTime == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.arrivalTime == -1 && <KeyboardArrowDownIcon />}
			</p>

			<p
				onClick={() =>
					sortAirlines(
						sortOptions?.duration == 1
							? { duration: -1 }
							: { duration: 1 }
					)
				}
			>
				DURATION{sortOptions?.duration == null && <UnfoldMoreIcon />}
				{sortOptions?.duration == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.duration == -1 && <KeyboardArrowDownIcon />}
			</p>
			<p
				onClick={() =>
					sortAirlines(
						sortOptions?.ticketPrice == 1
							? { ticketPrice: -1 }
							: { ticketPrice: 1 }
					)
				}
			>
				PRICE{sortOptions?.ticketPrice == null && <UnfoldMoreIcon />}
				{sortOptions?.ticketPrice == 1 && <KeyboardArrowUpIcon />}
				{sortOptions?.ticketPrice == -1 && <KeyboardArrowDownIcon />}
			</p>
		</div>
	);
}
