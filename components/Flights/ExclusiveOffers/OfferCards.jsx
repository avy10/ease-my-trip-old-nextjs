import { useRef, useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./OfferCards.module.css";
export default function OfferCards({ offers, isloading }) {
	const containerRef = useRef();
	const [disableLeftButton, setDisableLeftButton] = useState(false);
	const [disableRightButton, setDisableRightButton] = useState(false);
	const [scrollDistance, setScrollDistance] = useState(0);

	// function toggleButtons() {
	// 	if (containerRef == null || containerRef == undefined) {
	// 		// console.log("FFFSSSSSS ONE");
	// 		return;
	// 	}
	// 	// if (scrollDistance == "0") {
	// 	// 	// console.log("FFFSSSSSS TWO");
	// 	// 	setDisableLeftButton(true);
	// 	// 	return;
	// 	// }
	// 	// if (scrollDistance >= "1805") {
	// 	// 	// console.log("FFFSSSSSS THREE");
	// 	// 	setDisableRightButton(true);
	// 	// 	return;
	// 	// }
	// 	// if (scrollDistance > "0" || scrollDistance < "1805") {
	// 	// 	// console.log("FFFSSSSSS FOUR");
	// 	// 	setDisableLeftButton(false);
	// 	// 	setDisableRightButton(false);
	// 	}
	// }
	// useEffect(() => {
	// 	// console.log(
	// 	// 	"AM I WORKING AAAAAAAAAAAAAAAAAAAA",
	// 	// 	containerRef.current.scrollLeft
	// 	// );
	// 	toggleButtons();
	// }, [scrollDistance]);
	return (
		<div className={styles.mainBox}>
			<button
				className={`${styles.leftScrollButton} flex-center-center`}
				onClick={() => (containerRef.current.scrollLeft -= 500)}
			>
				<ArrowBackIosNewIcon />
			</button>
			<div className={styles.offerCardsDiv} ref={containerRef}>
				{isloading && (
					<div className={styles.offerSkeletonDiv}>
						{[0, 1, 2, 3, 4, 5].map((ele) => (
							<Box
								sx={{
									width: 450,
									height: 350,
									margin: "10px",
								}}
								key={ele}
							>
								<Skeleton
									variant="rectangular"
									sx={{
										width: 450,
										height: 200,
										borderRadius: "10px",
									}}
								/>
								<Skeleton
									animation="wave"
									sx={{ width: 450, height: 25 }}
								/>
								<Skeleton
									animation={false}
									sx={{ width: 450, height: 25 }}
								/>
							</Box>
						))}
					</div>
				)}
				{!isloading &&
					offers.map((element) => (
						<OfferCard data={element} key={element._id} />
					))}
				{/* <OfferCard data={data} /> */}
			</div>
			<button
				className={`${styles.rightScrollButton} flex-center-center`}
				onClick={() => (containerRef.current.scrollLeft += 500)}
			>
				<ArrowForwardIosIcon />
			</button>
		</div>
	);
}

function OfferCard({ data }) {
	const [expandText, setExpandText] = useState(true);

	return (
		<div className={styles.offerCards}>
			<div className={styles.offerImageDIV}>
				{/* <img src={data.newHeroUrl} /> */}
				<img src={data.heroUrl} />
			</div>
			<div className={styles.offerTextDIV}>
				<p
					className={styles.headerOfferText}
					onClick={() => setExpandText(true)}
				>
					{data.pTl}
					{!expandText && (
						<span
							className={styles.offerTextExpand}
							onClick={() => setExpandText(true)}
						>
							&nbsp;&nbsp;...
						</span>
					)}
				</p>
				{expandText && (
					<p className={styles.expandedOfferText}>
						{" "}
						{data.pTx}{" "}
						{expandText && (
							<span
								className={styles.offerTextExpand}
								onClick={() => setExpandText(false)}
							>
								.....
							</span>
						)}
					</p>
				)}
			</div>
			{(data?.tncCtaText?.toLowerCase() == "book now" ||
				data?.tncCtaText?.toLowerCase() == "explore offers" ||
				data?.tncCtaText?.toLowerCase() == "explore now") && (
				<p className={styles.offerPersuasion}>
					{data.tncCtaText.toUpperCase()}
				</p>
			)}
		</div>
	);
}

// const data = {
// 	_id: "652e6bc69c8d0a476382fff2",
// 	type: "ALL",
// 	active: true,
// 	ctaText: "View Details",
// 	id: 17764,
// 	pTl: "Grab up to 45% OFF* on",
// 	pTx: "hotels in India & plan your great escapes during festive days & long weekends.",
// 	lob: "DH,OTHERS",
// 	Fl: "Search,Home",
// 	hero: true,
// 	heroUrl:
// 		"https://promos.makemytrip.com/appfest/2x/BG-DH-TGES-091023.jpg",
// 	newHeroUrl:
// 		"https://promos.makemytrip.com/notification/xhdpi/Desktop-TGES-Multi-lobs-061023.jpg",
// 	newHeroOfferCardUrl:
// 		"https://promos.makemytrip.com/notification/xhdpi/Desktop-TGES-Multi-lobs-061023.jpg",
// 	cardCTAText: "View Details",
// 	tncCtaText: "EXPLORE OFFERS",
// 	visibleOnHome: true,
// 	offerPersuasion: "View Details",
// 	bank: "None",
// 	lobDisplayIconUrl:
// 		"https://promos.makemytrip.com/appfest/%%s/OfferHotelIcon.png",
// 	lobDisplayText: "DOM HOTELS",
// 	skyBigFullImgUrl:
// 		"https://promos.makemytrip.com/appfest/%s/Fullimage-TGES-DHv-091023.jpg",
// 	welcomeOffer: false,
// 	__v: 0,
// };
