import StarRating from "@/components/Custom-User-Components/StarRating";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getRandomNumber } from "@/public/utils/getRandomNumber";
import imageOne from "@/public/imageOne.jpg";
import imageTwo from "@/public/imageTwo.jpg";
export default function ImageAndRatingCard({ imageArray, rating }) {
	return (
		<div className="hotel-image-rating-card">
			<HotelImageContainer
				imageArray={imageArray}
				maxImageLength={imageArray?.length}
				containerWidth="400px"
				containerHeight="220px"
			/>
			<div className="rating-div">
				<StarRating size={16} defaultRating={rating} />
			</div>
			<UserRating />
		</div>
	);
}

export function HotelImageContainer({
	imageArray,
	maxImageLength,
	containerWidth,
	containerHeight,
	renderChildren = false,
	isMobile,
}) {
	const [imageIndex, setImageIndex] = useState(0);
	function updateImageIndex(target) {
		if (target == "inc") {
			setImageIndex((prev) => (prev + 1) % maxImageLength);
		}
		if (target == "dec") {
			setImageIndex((prev) => (prev - 1) % maxImageLength);
		}
	}
	const hotelImageContainerStyle = {
		display: "flex",
		flexDirection: "row",
		columnGap: "10px",
	};
	const hotelImageContainerMobileStyle = {
		display: "flex",
		flexDirection: "column",
		rowGap: "10px",
	};
	return (
		<div
			className="hotel-image-container"
			style={
				isMobile
					? hotelImageContainerMobileStyle
					: hotelImageContainerStyle
			}
		>
			<div
				className="hotel-image-slider-container"
				style={{
					width: containerWidth,
					height: containerHeight,
				}}
			>
				<img src={imageArray[imageIndex]} key={imageIndex} />
				<button
					className="hotel-image-slider-buttons left-button flex-center-center"
					onClick={() => updateImageIndex("dec")}
				>
					<KeyboardArrowLeftIcon style={{ fontSize: "24px" }} />
				</button>
				<button
					className="hotel-image-slider-buttons right-button flex-center-center"
					onClick={() => updateImageIndex("inc")}
				>
					<KeyboardArrowRightIcon style={{ fontSize: "24px" }} />
				</button>
			</div>
			{renderChildren && (
				<TheFourImageThumbnails
					imageArray={imageArray}
					setImageIndex={setImageIndex}
					isMobile={isMobile}
				/>
			)}
		</div>
	);
}

function TheFourImageThumbnails({ imageArray, setImageIndex, isMobile }) {
	const divStyle = { height: "75px", width: "120px" };
	const mobileDivStyle = { height: "50px", width: "85px" };
	return (
		<div
			className="hotel-image-thumbnails-container"
			style={{
				display: "flex",
				flexDirection: isMobile ? "row" : "column",
				flexWrap: "wrap",
				rowGap: "5px",

				columnGap: "5px",
			}}
		>
			{imageArray.map((image, index) => (
				<div
					className="hotel-image-tumbnail-single-div"
					onClick={() => setImageIndex(index)}
					style={isMobile ? mobileDivStyle : divStyle}
					key={index}
				>
					<img
						src={image}
						style={{
							height: "100%",
							width: "100%",
							borderRadius: "5px",
						}}
					/>
				</div>
			))}
		</div>
	);
}

export function UserRating() {
	const [userRating] = useState(() => getRandomNumber(2.5, 5.0, 2));
	const [noOfPeople] = useState(() => getRandomNumber(300, 1000, 0));
	const [ratingText, setRatingText] = useState("");
	const [backgroundColor, setBackgroundColor] = useState("");
	useEffect(() => {
		if (userRating >= 4.5) {
			setRatingText("Excellent");
			setBackgroundColor("excellent");
			return;
		}
		if (userRating >= 4) {
			setRatingText("Very Good");
			setBackgroundColor("high");
			return;
		}
		if (userRating >= 3) {
			setRatingText("Good");
			setBackgroundColor("good");
			return;
		}
		if (userRating < 3) {
			setRatingText("Okay");
			setBackgroundColor("okayish");
			return;
		}
	}, [userRating]);
	return (
		<div className="user-rating">
			<div className="user-rating-text">
				<h5>{ratingText}</h5>
				<p>{noOfPeople} reviews</p>
			</div>
			<div
				className="user-rating-icon flex-center-center"
				id={backgroundColor + "-" + "user-rating-icon"}
			>
				{userRating}
			</div>
		</div>
	);
}
