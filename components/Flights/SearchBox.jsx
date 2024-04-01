import React, { useContext, useEffect, useState } from "react";

import PreInfo from "./Search/PreInfo";
import MainBox from "./Search/MainBox";
export default function SearchBox() {
	return (
		<div className="flightSearchBox">
			<div className="innerBox">
				<PreInfo />
				<MainBox />
			</div>
		</div>
	);
}
