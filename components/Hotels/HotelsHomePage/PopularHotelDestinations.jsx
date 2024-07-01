import { POPULAR_HOTELS } from "@/public/utils/popularHotels";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
export default function PopularHotelDestinations() {
	const [maxItems, setMaxItems] = useState(12);
	return (
		<div className="pop-hotels-div flex-center-center">
			<div className="titleDiv">
				<h1 className="title-EO">
					Book Hotels at Popular Destinations
				</h1>
			</div>
			{POPULAR_HOTELS.map((ele, ind) => {
				/* 				if (ele.isClickable) {
					return <SingleDestinationDiv ele={ele} key={ele.name} />;
					} else {
						return <DestinationNA ele={ele} key={ele.name} />;
				} */
				return ind + 1 <= maxItems ? (
					<SingleDestinationDiv ele={ele} key={ele.name} />
				) : null;
			})}
			{maxItems == 12 && (
				<div
					className="showAllOffersBTN pop-div-show-btn"
					onClick={() => setMaxItems(18)}
					key={"viewMore"}
				>
					View All Hotels{" "}
				</div>
			)}
			{maxItems == 18 && (
				<div
					className="showAllOffersBTN "
					onClick={() => setMaxItems(12)}
					key={"viewLess"}
				>
					View Less Hotels{" "}
				</div>
			)}
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
function SingleDestinationDiv({ ele }) {
	const router = useRouter();
	const [openSnackBar, setOpenSnackBar] = useState(false);
	function handleSnackBarOpen() {
		setOpenSnackBar(true);
	}
	function handleSnackBarClose() {
		setOpenSnackBar(false);
	}
	const [snackBarMSG, setSnackBarMSG] = useState("");
	const action = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleSnackBarClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);
	function handleClick() {
		if (ele.isClickable) {
			router.push(`/hotels/search`);
		} else {
			setSnackBarMSG(`Hotels at ${ele.name} are COMING SOON!!`);
			handleSnackBarOpen();
		}
	}
	return (
		<div className="single-destination" onClick={handleClick}>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={3000}
				onClose={handleSnackBarClose}
				message={snackBarMSG}
				action={action}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			/>
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
