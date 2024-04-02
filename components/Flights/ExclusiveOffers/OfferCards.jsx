import { useState } from "react";
export default function OfferCards({ offers }) {
	const data = {
		_id: "652e6bc69c8d0a476382fff2",
		type: "ALL",
		active: true,
		ctaText: "View Details",
		id: 17764,
		pTl: "Grab up to 45% OFF* on",
		pTx: "hotels in India & plan your great escapes during festive days & long weekends.",
		lob: "DH,OTHERS",
		Fl: "Search,Home",
		hero: true,
		heroUrl:
			"https://promos.makemytrip.com/appfest/2x/BG-DH-TGES-091023.jpg",
		newHeroUrl:
			"https://promos.makemytrip.com/notification/xhdpi/Desktop-TGES-Multi-lobs-061023.jpg",
		newHeroOfferCardUrl:
			"https://promos.makemytrip.com/notification/xhdpi/Desktop-TGES-Multi-lobs-061023.jpg",
		cardCTAText: "View Details",
		tncCtaText: "EXPLORE OFFERS",
		visibleOnHome: true,
		offerPersuasion: "View Details",
		bank: "None",
		lobDisplayIconUrl:
			"https://promos.makemytrip.com/appfest/%%s/OfferHotelIcon.png",
		lobDisplayText: "DOM HOTELS",
		skyBigFullImgUrl:
			"https://promos.makemytrip.com/appfest/%s/Fullimage-TGES-DHv-091023.jpg",
		welcomeOffer: false,
		__v: 0,
	};
	return (
		<div className="offerCardsDiv">
			{offers.map((element) => (
				<OfferCard data={element} key={element._id} />
			))}
			{/* <OfferCard data={data} /> */}
		</div>
	);
}

function OfferCard({ data }) {
	const [expandText, setExpandText] = useState(true);
	return (
		<div className="offerCards">
			<div className="offerImageDIV">
				{/* <img src={data.newHeroUrl} /> */}
				<img src={data.heroUrl} />
			</div>
			<div className="offerTextDIV">
				<p
					className="headerOfferText"
					onClick={() => setExpandText(true)}
				>
					{data.pTl}
					{!expandText && (
						<span
							className="offerTextExpand"
							onClick={() => setExpandText(true)}
						>
							&nbsp;&nbsp;...
						</span>
					)}
				</p>
				{expandText && (
					<p className="expandedOfferText">
						{" "}
						{data.pTx}{" "}
						{expandText && (
							<span
								className="offerTextExpand"
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
				<p className="offerPersuasion">
					{data.tncCtaText.toUpperCase()}
				</p>
			)}
		</div>
	);
}
