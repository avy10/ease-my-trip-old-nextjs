import ExclusiveOffers from "@/components/Flights/ExclusiveOffers/ExclusiveOffers";
import Refund from "@/components/Flights/Refund/Refund";
import HotelSearchBar from "@/components/Hotels/HotelsHomePage/HotelSearchBar";
import PriceGuarantee from "@/components/Hotels/HotelsHomePage/PriceGuarantee";
import { Container } from "@mui/material";

export default function Hotels() {
	return (
		<Container
			maxWidth="lg"
			style={{
				position: "relative",
				top: "80px",
			}}
		>
			<HotelSearchBar />
			<PriceGuarantee />
			<ExclusiveOffers activeTabCustomisation={2} />
			<Refund />
		</Container>
	);
}
