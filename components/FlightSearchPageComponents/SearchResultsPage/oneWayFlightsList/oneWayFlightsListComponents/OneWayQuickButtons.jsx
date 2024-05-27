import { useSearchResultsModificationContext } from "@/contexts/SearchResultsModificationContext";
import { Divider } from "@mui/material";

export default function OneWayQuickButtons({ sortAirlines }) {
	const quickSortStates = useSearchResultsModificationContext();
	const { sortOptions } = quickSortStates;
	return (
		<div className="one-way-flights-quick-buttons">
			<div className="lhs-sort-buttons flex-center-center">
				<span>Sort By: </span>
				<button
					className={
						sortOptions.ticketPrice == 1
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
						sortOptions.duration == 1
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
				<span>Previous Day</span>
				<Divider
					orientation="vertical"
					variant="middle"
					flexItem
					sx={{ backgroundColor: "black" }}
				/>
				<span>Next Day</span>
			</div>
		</div>
	);
}
