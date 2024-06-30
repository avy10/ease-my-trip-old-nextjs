import { POPULAR_HOTELS } from "@/public/utils/popularHotels";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function PopularHotelDestinations() {
	return (
		<div className="pop-hotels-div flex-center-center">
			{POPULAR_HOTELS.map((ele, ind) => {
				/* 				if (ele.isClickable) {
					return <SingleDestinationDiv ele={ele} key={ele.name} />;
					} else {
						return <DestinationNA ele={ele} key={ele.name} />;
				} */
				return <SingleDestinationDiv ele={ele} key={ele.name} />;
			})}
		</div>
	);
}
function DestinationNA({ ele }) {
	const [openToolTip, setOpenToolTip] = useState(true);
	const handleClose = () => {
		setOpenToolTip(false);
	};

	const handleOpen = () => {
		setOpenToolTip(true);
	};

	const BootstrapTooltip = styled(({ className, ...props }) => (
		<Tooltip
			open={openToolTip}
			onClose={handleClose}
			onOpen={handleOpen}
			{...props}
			arrow
			classes={{ popper: className }}
			slotProps={{
				popper: {
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -14],
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
	return (
		<>
			<BootstrapTooltip title="COMING SOON" arrow key={ele.name}>
				<SingleDestinationDiv ele={ele} />
			</BootstrapTooltip>{" "}
		</>
	);
}
function SingleDestinationDiv({ ele, handleOpen }) {
	return (
		<div className="single-destination">
			<div className="icon-div">
				<img src={ele.iconSrc} />
			</div>
			<div className="name-div">
				<p className="text-bold">{ele.name}</p>
				<p className="text-smol">
					<span className="blue-bottom-hover-span">
						Hotels,&nbsp;
					</span>
					<span className="blue-bottom-hover-span">
						Budget Hotels,&nbsp;
					</span>
					<span className="blue-bottom-hover-span">
						3 Star Hotels,&nbsp;
					</span>
					<span className="blue-bottom-hover-span">
						4 Star Hotels,&nbsp;
					</span>
					<span className="blue-bottom-hover-span">
						5 Star Hotels
					</span>
				</p>
			</div>
		</div>
	);
}
