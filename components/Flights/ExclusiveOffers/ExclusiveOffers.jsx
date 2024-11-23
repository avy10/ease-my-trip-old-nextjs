import { useEffect, useState } from "react";
import OfferTypeTab from "./OfferTypeTab";
import { domain, offersURL } from "@/public/utils/apiFetch";
import OfferCards from "./OfferCards";
import styles from "./ExclusiveOffers.module.css";
export default function ExclusiveOffers({ activeTabCustomisation = 0 }) {
	const [offers, setOffers] = useState([]);
	const [activeTab, setActiveTab] = useState(activeTabCustomisation);
	const [isloading, setIsLoading] = useState(true);

	useEffect(() => {
		// const types = ["ALL", "FLIGHTS", "HOTELS", "RAILS", "BUSES"];
		setIsLoading(true);
		const types = ["ALL", "FLIGHTS", "HOTELS", "RAILS"];
		const myHeaders = new Headers();
		myHeaders.append("projectID", "qwqzgpiy336h");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		const URL =
			`${domain}${offersURL}?filter={` +
			'"' +
			"type" +
			'"' +
			":" +
			'"' +
			`${types[activeTab]}` +
			'"' +
			"}";
		// console.log(URL);
		fetch(`${URL}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setOffers(result?.data?.offers);
				// console.log(result);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}, [activeTab]);
	return (
		<>
			<div className={styles.offersContainerMINI}>
				<div className="titleDiv">
					<h1 className="titleEO">EXCLUSIVE OFFERS</h1>
				</div>
				<OfferTypeTab
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>

				<OfferCards offers={offers} isloading={isloading} />

				<div className={styles.showAllOffersBTN}>View All Offers</div>
			</div>
		</>
	);
}
