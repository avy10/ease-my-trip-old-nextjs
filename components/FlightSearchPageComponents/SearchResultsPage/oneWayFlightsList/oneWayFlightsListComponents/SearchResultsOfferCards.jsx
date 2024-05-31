import { emtCoupons } from "@/public/utils/FlightUtils/emtCoupons";
import { useEffect, useRef, useState } from "react";
export default function SearchResultsOfferCards() {
	const containerRef = useRef();
	// useEffect(() => {
	// 	console.log("CONTAINER REF IS HERE", containerRef);
	// }, [containerRef]);

	const [disableLeftButton, setDisableLeftButton] = useState(false);
	const [disableRightButton, setDisableRightButton] = useState(false);
	const [scrollDistance, setScrollDistance] = useState(0);
	function toggleButtons() {
		if (containerRef == null || containerRef == undefined) {
			// console.log("FFFSSSSSS ONE");
			return;
		}
		if (scrollDistance == "0") {
			// console.log("FFFSSSSSS TWO");
			setDisableLeftButton(true);
			return;
		}
		if (scrollDistance >= "1805") {
			// console.log("FFFSSSSSS THREE");
			setDisableRightButton(true);
			return;
		}
		if (scrollDistance > "0" || scrollDistance < "1805") {
			// console.log("FFFSSSSSS FOUR");
			setDisableLeftButton(false);
			setDisableRightButton(false);
		}
	}

	useEffect(() => {
		// console.log(
		// 	"AM I WORKING AAAAAAAAAAAAAAAAAAAA",
		// 	containerRef.current.scrollLeft
		// );
		toggleButtons();
	}, [scrollDistance]);
	return (
		<div className="emt-flight-results-coupons flex-center-center">
			<button
				className="flex-center-center"
				onClick={() => {
					containerRef?.current.scrollLeft -= 500;
					setScrollDistance((prev) => (prev -= 500));
				}}
				disabled={disableLeftButton}
			>
				{"<"}
			</button>
			<div className="emt-flight-results-container" ref={containerRef}>
				{emtCoupons.map((ele, index) => (
					<div className="outer-box " key={index}>
						<div className="img-container">
							<img src="https://flight.easemytrip.com/M_Content/img/gift-box.svg" />
						</div>
						<div className="text-container">
							<strong>{ele.cpn}</strong> || <span>{ele.dtl}</span>
						</div>
					</div>
				))}
			</div>
			<button
				className="flex-center-center"
				onClick={() => {
					containerRef?.current.scrollLeft += 500;
					setScrollDistance((prev) => (prev += 500));
				}}
				disabled={disableRightButton}
			>
				{">"}
			</button>
		</div>
	);
}
