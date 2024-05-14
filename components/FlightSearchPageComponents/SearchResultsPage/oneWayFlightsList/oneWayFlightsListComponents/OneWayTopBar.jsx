import DateCard from "./DateCard";
import OneWayQuickButtons from "./OneWayQuickButtons";
import SearchResultsOfferCards from "./SearchResultsOfferCards";
import SortButtons from "./SortButtons";

export default function OneWayTopBar() {
	return (
		<div className="one-way-top-bar">
			<OneWayQuickButtons />
			<SearchResultsOfferCards />
			<DateCard />
			<SortButtons />
		</div>
	);
}