import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// css in globals.css
import Divider from "@mui/material/Divider";

export default function FaQsComponent({ element }) {
	const [showText, setShowText] = useState(false);
	return (
		<>
			<div className="single-faq-container">
				<p
					className="faq-heading-text"
					onClick={() => setShowText((prev) => !prev)}
				>
					{element.heading}
					{showText && <ExpandLessIcon sx={{ fontSize: "35px" }} />}
					{!showText && <ExpandMoreIcon sx={{ fontSize: "35px" }} />}
				</p>
				{showText && (
					<p className="faq-para-text">{element.textContent}</p>
				)}
				<Divider />
			</div>
		</>
	);
}
