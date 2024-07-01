import ExclusiveOffers from "@/components/Flights/ExclusiveOffers/ExclusiveOffers";
import Refund from "@/components/Flights/Refund/Refund";
import HotelSearchBar from "@/components/Hotels/HotelsHomePage/HotelSearchBar";
import PopularHotelDestinations from "@/components/Hotels/HotelsHomePage/PopularHotelDestinations";
import PriceGuarantee from "@/components/Hotels/HotelsHomePage/PriceGuarantee";
import TopHotelsChain from "@/components/Hotels/HotelsHomePage/TopHotelsChain";
import { Container } from "@mui/material";
import { whyusARRHOTELS } from "@/public/utils/FlightUtils/whyusText";
import WhyUs from "@/components/Flights/bottomHalf/WhyUs";
import FaQsComponent from "@/components/Custom-User-Components/FaQsComponent";
import { FAQ_HOTELS_DATA_ARRAY } from "@/public/utils/faqHotels";

import promoBanner from "@/public/assests/images/icons/hotelsIcons/bannner-hotel-newht.webp";
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
			<PopularHotelDestinations />
			<TopHotelsChain />

			<div className="why-us-hotels-div">
				<WhyUs content={whyusARRHOTELS} />
			</div>
			<PromoBanner />

			<div className="hotels-faq-div">
				<h2>FAQs</h2>
				{FAQ_HOTELS_DATA_ARRAY.map((element, index) => (
					<FaQsComponent element={element} key={index} />
				))}
			</div>
		</Container>
	);
}

function PromoBanner() {
	return (
		<div className="hotel-promo-banner">
			<div className="text-content">
				<p className="text-bold">
					Cheapest Deals on Budget & Luxury Hotels are Available at
					EaseMyTrip
				</p>
				<p className="text-smol">
					Due to the huge influx of tourists in India, EaseMyTrip
					offers a wide range of luxury, deluxe and budget hotels to
					them. Choose to stay in luxury and comfort with the greatest
					discounts available on hotel bookings. We list the classiest
					budget hotels on our site along with some of the prominent
					international hotel chains of India including Oberoi Group,
					ITC Group, Taj Group, Le Meridian Group and many others.
					Ranging from class hotels to luxury beach resorts, each
					hotel on our site gives you a memorable staying experience.
					Along with deluxe, budget and luxury hotels, EaseMyTrip also
					displays a number of heritage hotels that offer you a royal
					stay. Enjoy cheap hotel deals for any destination with great
					savings.
				</p>
			</div>
		</div>
	);
}
