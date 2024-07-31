import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function Profile({ userName }) {
	const profileElementData = [
		{
			text: <span>{`Welcome ${userName}!`}</span>,
			children: <></>,
		},
		{
			text: `My Profile`,
			children: <AccountBoxIcon sx={{ color: "#4dabf5" }} />,
		},
		{
			text: `My Bookings`,
			children: <ConfirmationNumberIcon sx={{ color: "#4dabf5" }} />,
		},
		{
			text: `Sign Out`,
			children: <LogoutIcon />,
		},
	];
	return (
		<div className="user-div">
			{profileElementData.map((element, index) => (
				<SingleProfileElement
					text={element.text}
					children={element.children}
					key={index}
				/>
			))}
		</div>
	);
}
function SingleProfileElement({ text, children }) {
	const [showArrowDiv, setShowArrowDiv] = useState(false);

	return (
		<div
			className={"user-div-elements-package"}
			onMouseEnter={() => setShowArrowDiv(true)}
			onMouseLeave={() => setShowArrowDiv(false)}
		>
			<div className="arrow-div">
				{showArrowDiv && <DoubleArrowIcon sx={{ color: "#4dabf5" }} />}
			</div>
			<div className="text-div">
				{text}
				<>&nbsp;</>
				{children}
			</div>
		</div>
	);
}
