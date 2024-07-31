import React from "react";

import PreInfo from "./PreInfo";
import MainBox from "./MainBox";
import MainBoxTwo from "./MainBoxTwo";
import styles from "./SearchBox.module.css";
export default function SearchBox() {
	return (
		<div className={styles.flightSearchBox}>
			<div className={styles.innerBox}>
				<PreInfo />
				<MainBox />
				{/* <MainBoxTwo /> */}
			</div>
		</div>
	);
}
