import StarRating from "@/components/Custom-User-Components/StarRating";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getRandomNumber } from "@/public/utils/getRandomNumber";
export default function ImageAndRatingCard({ imageArray, rating }) {
	return (
		<div className="hotel-image-rating-card">
			<ImageContainer
				imageArray={imageArray}
				maxImageLength={imageArray?.length}
			/>
			<div className="rating-div">
				<StarRating size={16} defaultRating={rating} />
			</div>
			<UserRating />
		</div>
	);
}

function ImageContainer({ imageArray, maxImageLength }) {
	const [imageIndex, setImageIndex] = useState(0);
	function updateImageIndex(target) {
		if (target == "inc") {
			setImageIndex((prev) => (prev + 1) % maxImageLength);
		}
		if (target == "dec") {
			setImageIndex((prev) => (prev - 1) % maxImageLength);
		}
	}
	return (
		<div className="image-container">
			<img src={imageArray[imageIndex]} key={imageIndex} />
			<button
				className="image-slider-buttons left-button flex-center-center"
				onClick={() => updateImageIndex("dec")}
			>
				<KeyboardArrowLeftIcon style={{ fontSize: "24px" }} />
			</button>
			<button
				className="image-slider-buttons right-button flex-center-center"
				onClick={() => updateImageIndex("inc")}
			>
				<KeyboardArrowRightIcon style={{ fontSize: "24px" }} />
			</button>
		</div>
	);
}

function UserRating() {
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
