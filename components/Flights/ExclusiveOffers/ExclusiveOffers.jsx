import { useEffect, useState } from "react";
import OfferTypeTab from "./OfferTypeTab";
import { domain, offersURL } from "@/public/utils/apiFetch";
import OfferCards from "./OfferCards";
import Skeleton from "@mui/material/Skeleton";
export default function ExclusiveOffers() {
	const [offers, setOffers] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [isloading, setIsLoading] = useState(true);

	useEffect(() => {
		// const types = ["ALL", "FLIGHTS", "HOTELS", "RAILS", "BUSES"];
		setIsLoading(true);
		const types = ["ALL", "FLIGHTS", "HOTELS", "RAILS"];
		const myHeaders = new Headers();
		myHeaders.append("projectID", "${projectID}");
		myHeaders.append("random", "adsaav");

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
		console.log(URL);
		fetch(`${URL}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setOffers(result?.data?.offers);
				console.log(result);
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
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
				{!isloading && <OfferCards offers={offers} />}
				{isloading && (
					<div className="offerSkeletonDiv">
						<Skeleton
							variant="rectangular"
							width={210}
							height={118}
						/>
						<Skeleton
							variant="rectangular"
							width={210}
							height={118}
						/>
						<Skeleton
							variant="rectangular"
							width={210}
							height={118}
						/>
						<Skeleton
							variant="rectangular"
							width={210}
							height={118}
						/>
					</div>
				)}
			</div>
		</>
	);
}
