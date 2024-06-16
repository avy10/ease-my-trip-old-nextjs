import important from "@/public/assests/images/icons/important.svg";
import travelGuide from "@/public/assests/images/icons/trvl-guid.svg";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const DATA_TO_RENDER = [
	{
		iconSource: important.src,
		heading: "Important Info",
		textContent:
			"To cancel/claim refund or reschedule/modify your booking . ",
	},
	{
		iconSource: travelGuide.src,
		heading: "Travel Guide",
		textContent:
			"Get latest information on airlines & airports guidelines, state-wise quarantine rules, travel checklists, web-checkin etc.",
	},
];
export default function InfoBoxes() {
	// css in styles\flights\flightsHome.css
	return (
		<div className="info-box-main-div ">
			{DATA_TO_RENDER.map((element, index) => (
				<SingleInfoBox element={element} key={index} />
			))}
		</div>
	);
}

function SingleInfoBox({ element }) {
	const BootstrapTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} arrow classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: theme.palette.common.black,
		},
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.black,
		},
	}));
	return (
		<div className="single-info-box flex-center-center">
			<div className="icon-box">
				<img src={element.iconSource} />
			</div>
			<div className="text-box">
				<h2>{element.heading}</h2>
				<p>
					{element.textContent}
					<BootstrapTooltip title="COMING SOON" arrow>
						<span>Click here...</span>
					</BootstrapTooltip>
				</p>
			</div>
		</div>
	);
}
