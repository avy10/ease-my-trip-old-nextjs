import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import thailand from "@/public/assests/images/icons/travelBlogs/book-a-trip-to-thailand-hp.webp";
import vibrantFestivals from "@/public/assests/images/icons/travelBlogs/vibrant-festivals-worldwide-hp.webp";
import travelWithKids from "@/public/assests/images/icons/travelBlogs/booking-flights-with-kids-hp.webp";
import bahrain from "@/public/assests/images/icons/travelBlogs/travelers-to-bahrain-hp.webp";
import EastIcon from "@mui/icons-material/East";
// css in flightsHome.css. UPDATE : css moved into module
import styles from "./TravelBlogs.module.css";
const TRAVEL_BLOGS_TITLE = [
	{
		blogTitle: "Things you need to know before you book a trip to Thailand",
		iconSource: thailand.src,
	},
	{
		blogTitle: "Uncovering Top 10 Vibrant Festivals Worldwide",
		iconSource: vibrantFestivals.src,
	},
	{
		blogTitle: "Essential Tips for Booking Flights with Kids",
		iconSource: travelWithKids.src,
	},
	{
		blogTitle: "A Guide for First-Time Travelers to Bahrain",
		iconSource: bahrain.src,
	},
];
export default function TravelBlogs() {
	return (
		<div className={styles.travelBlogs}>
			<div className="titleDiv">
				<h1 className="titleEO">Enjoy Fresh Travel Blogs</h1>
			</div>
			<Container maxWidth="lg">
				<div className={styles.blogCards}>
					{TRAVEL_BLOGS_TITLE.map((element, index) => (
						<SingleTravelBlog element={element} key={index} />
					))}
				</div>
			</Container>
		</div>
	);
}
function SingleTravelBlog({ element }) {
	const [openToolTip, setOpenToolTip] = useState(false);
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
		<BootstrapTooltip title="COMING SOON" arrow>
			<div
				className={styles.singleTravelDiv}
				onClick={() => setOpenToolTip(true)}
			>
				<div className={styles.backgroundImageDiv}>
					<img src={element.iconSource} />
				</div>
				<div className={styles.blurOverlay}></div>
				<div className={styles.topContent}>Holiday Destinations</div>
				<div className={styles.blogTitle}>{element.blogTitle}</div>
				<div className={styles.readMore}>
					<p>Read More</p>
					<EastIcon />
				</div>
			</div>
		</BootstrapTooltip>
	);
}
