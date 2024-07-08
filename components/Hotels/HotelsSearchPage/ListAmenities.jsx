import Divider from "@mui/material/Divider";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getRandomNumber } from "@/public/utils/getRandomNumber";
import { useState } from "react";
import discountIcon from "@/public/assests/images/icons/discount-logo.svg";
export default function ListAmenities({ hotelAmneties, hotelHouseRules }) {
	return (
		<div className="amenities-list">
			<div>
				{hotelAmneties.map((element, index) => {
					if (index == 0) {
						return <span key={index}>{element}</span>;
					}
					return (
						<span key={index}>
							{"  "}
							<Divider
								orientation="vertical"
								flexItem
								style={{
									display: "inline",
									marginRight: "5px",
									width: "5px",
								}}
							/>
							{"  "}
							{element}
						</span>
					);
				})}
			</div>
			<div>
				{hotelHouseRules?.guestProfile?.unmarriedCouplesAllowed && (
					<span>Couple Friendly</span>
				)}
				{hotelHouseRules?.idProofRelated?.localIdsAllowed && (
					<span>
						<>
							{hotelHouseRules?.guestProfile
								?.unmarriedCouplesAllowed && (
								<>
									{"  "}
									<Divider
										orientation="vertical"
										flexItem
										style={{
											display: "inline",
											marginRight: "5px",
											width: "5px",
										}}
									/>
									{"  "}
								</>
							)}
						</>
						Local IDs Accepted
					</span>
				)}
			</div>
		</div>
	);
}

export function CancellationBreakfast() {
	return (
		<div className="cancellation-breakfast-card">
			<div className="cancellation-card">
				<DoneAllIcon style={{ fontSize: "14px" }} />
				Free Cancellation
			</div>
			<div className="breakfast-card">
				<DoneAllIcon style={{ fontSize: "14px" }} />
				Free Breakfast
			</div>
		</div>
	);
}

export function PeopleViewing() {
	const [peopleCount] = useState(() => getRandomNumber(5, 100, 0));
	return (
		<div className="hotel-viewers-count flex-center-center">
			<VisibilityOutlinedIcon style={{ fontSize: "11px" }} />
			&nbsp;&nbsp;
			{peopleCount} {"  "}People viewing
		</div>
	);
}

export function HotelDiscount() {
	return (
		<div className="hotel-discount flex-center-center">
			<img src={discountIcon.src} />
			EMTSTAY Discount Applied
		</div>
	);
}
