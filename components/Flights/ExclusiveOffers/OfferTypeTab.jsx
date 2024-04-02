// ["Best Offers", "Flight", "Hotel", "Train", "Bus"]
export default function OfferTypeTab({ activeTab, setActiveTab }) {
	return (
		<div className="offerTypeTabDIV">
			{["Best Offers", "Flight", "Hotel", "Train"].map((ele, index) => (
				<div
					className={
						activeTab == index
							? "offerTypeBTN activeOffer"
							: "offerTypeBTN"
					}
					onClick={() => setActiveTab(index)}
					key={index}
				>
					{ele}
				</div>
			))}
		</div>
	);
}
