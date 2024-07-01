import { TOP_HOTEL_CHAINS } from "@/public/utils/topHotelChains";
export default function TopHotelsChain() {
	return (
		<div className="top-hotels-chain-div">
			<div className="titleDiv">
				<h1 className="title-EO">Our Top Hotels Chain</h1>
			</div>
			<div id="text-content">
				EaseMyTrip has a wide range of luxury and budget-friendly hotel
				chain properties. We have picked the finest hotels in India with
				world-class amenities. We bring you not only a stay option, but
				an experience in your budget to enjoy the luxury. We make sure
				that all the hotels are safe, hygienic, comfortable, and easily
				approachable when it comes to location. Book your hotel with
				EaseMyTrip and don't forget to grab an amazing hotel deal to
				save huge on your stay.
			</div>
			<div className="image-flex-div ">
				{TOP_HOTEL_CHAINS.map((ele) => (
					<div className="img-div" key={ele.name}>
						<img src={ele.iconSrc} />
					</div>
				))}
			</div>
		</div>
	);
}
