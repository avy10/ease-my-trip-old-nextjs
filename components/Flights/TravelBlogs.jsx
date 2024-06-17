import Container from "@mui/material/Container";
import thailand from "@/public/assests/images/icons/travelBlogs/book-a-trip-to-thailand-hp.webp";
import vibrantFestivals from "@/public/assests/images/icons/travelBlogs/vibrant-festivals-worldwide-hp.webp";
import travelWithKids from "@/public/assests/images/icons/travelBlogs/booking-flights-with-kids-hp.webp";
import bahrain from "@/public/assests/images/icons/travelBlogs/travelers-to-bahrain-hp.webp";
import EastIcon from "@mui/icons-material/East";
// css in flightsHome.css
const TRAVEL_BLOGS_TITLE = [
	{
		blogTitle: "Things you need to know before you book a trip to Thailand",
		iconSource: thailand.src,
	},
	{
		blogTitle: "Uncovering Top 10 Vibrant Festivals Worldwide",
		iconSource: vibrantFestivals.src,
	},
	{
		blogTitle: "Essential Tips for Booking Flights with Kids",
		iconSource: travelWithKids.src,
	},
	{
		blogTitle: "A Guide for First-Time Travelers to Bahrain",
		iconSource: bahrain.src,
	},
];
export default function TravelBlogs() {
	return (
		<div className="travel-blogs-div">
			<div className="titleDiv">
				<h1 className="title-EO">Enjoy Fresh Travel Blogs</h1>
			</div>
			<Container maxWidth="lg">
				<div className="tb-cards-flexbox">
					{TRAVEL_BLOGS_TITLE.map((element, index) => (
						<SingleTravelBlog element={element} key={index} />
					))}
				</div>
			</Container>
		</div>
	);
}
function SingleTravelBlog({ element }) {
	return (
		<div className="single-travel-div">
			<div className="background-image-div">
				<img src={element.iconSource} />
			</div>
			<div className="blur-overlay"></div>
			<div className="top-content">Holiday Destinations</div>
			<div className="blog-title">{element.blogTitle}</div>
			<div className="read-more">
				<p>Read More</p>
				<EastIcon />
			</div>
		</div>
	);
}
