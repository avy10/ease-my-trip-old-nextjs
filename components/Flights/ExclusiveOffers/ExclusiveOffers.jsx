import { useEffect, useState } from "react";
import OfferTypeTab from "./OfferTypeTab";

export default function ExclusiveOffers() {
	const [offers, setOffers] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [loading, isLoading] = useState(true);

	useEffect(() => {
		const types = ["ALL", "FLIGHTS", "HOTELS", "RAILS", "BUSES"];
	}, [activeTab]);
	return (
		<>
			<div className="offersContainerMINI">
				<div className="titleDiv">
					<h1 className="title-EO">EXCLUSIVE OFFERS</h1>
				</div>
				<OfferTypeTab
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
		</>
	);
}
