// ["Best Offers", "Flight", "Hotel", "Train", "Bus"]
import styles from "./OfferTypeTab.module.css";
export default function OfferTypeTab({ activeTab, setActiveTab }) {
	return (
		<div className={styles.offerTypeTabDIV}>
			{["Best Offers", "Flight", "Hotel", "Train"].map((ele, index) => (
				<div
					className={
						activeTab == index
							? `${styles.offerTypeBTN} ${styles.activeOffer}`
							: `${styles.offerTypeBTN}`
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
