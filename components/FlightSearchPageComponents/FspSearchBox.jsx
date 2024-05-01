import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FlightSearchContext from "@/contexts/FlightSearchContext";
import dayjs from "dayjs";

import FspInputFields from "./FspSearchBoxComponents/FspInputFields";
import FspRadioButtons from "./FspSearchBoxComponents/FspRadioButtons";

import BasicDatePicker from "@/components/Custom-MUI-Components/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelectTravellersNumber from "../Flights/Search/SelectTravellersNumber";

// FspSearchBox => Flight Search Page - Search Box
export default function FspSearchBox() {
	const [errorInParams, setErrorInParams] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	// material UI state and function for backdrops
	const [open, setOpen] = useState(true);

	return (
		<div className="search-page-blue-search-box">
			<FspRadioButtons />
			<FspInputFields />
		</div>
	);
}
