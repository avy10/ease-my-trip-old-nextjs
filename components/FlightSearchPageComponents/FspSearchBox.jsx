import FspInputFields from "./FspSearchBoxComponents/FspInputFields";
import FspRadioButtons from "./FspSearchBoxComponents/FspRadioButtons";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelectTravellersNumber from "../Flights/Search/SelectTravellersNumber";

// FspSearchBox => Flight Search Page - Search Box
export default function FspSearchBox() {
	return (
		<div className="search-page-blue-search-box">
			<FspRadioButtons />
			<FspInputFields />
		</div>
	);
}
