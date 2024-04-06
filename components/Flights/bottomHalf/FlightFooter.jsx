import { useState } from "react";

const listItems = [
	"OUR OFFERINGS",
	"QUICK LINKS",
	"POPULAR DESTINATIONS",
	"POPULAR AIRLINE",
	"CONNECT WITH US",
	"OFFERS",
];
// in popular destination we will show list of Hotels of that particular location
// we can use the results of this api call to determine a particular location
/* 
fetch(`https://academics.newtonschool.co/api/v1/bookingportals/city?limit=100`, {
    method : "GET",
    headers: {
        projectID : "4xh7gn2pv8it"
    }
})
.then(res => res.json())
.then(data => console.log(data))
*/
export default function FlightFooter() {
	const [rightElementToDisplay, setRightElementToDisplay] = useState(
		<OurOfferings />
	);
	return (
		<div className="flight-footer">
			<LeftFooter />
			<RightFooter children={rightElementToDisplay} />
		</div>
	);
}

function LeftFooter() {
	return (
		<div className="left-footer">
			<ul className="left-footer-ul">
				{listItems.map((ele, index) => (
					<li key={index}>{ele}</li>
				))}
			</ul>
		</div>
	);
}

function RightFooter({ children }) {
	return <div className="right-footer">{children}</div>;
}

function OurOfferings() {
	return (
		<>
			<h2>
				Make your travel easy with a wide range of products and services
			</h2>
			<div className="offerings-navigations">
				<p>flight </p>
				{/* flight navigates to flight homepage */}
				<p>hotels</p>
				{/* hotels navigates to hotels homepage */}
				<p>trains</p>
				{/* trains navigates to trains homepage */}
				<p>bus</p>
				{/* bus navigates to buses homepage */}
				<p>airports</p>
				{/* lists all the 30 airports provided by the API */}
			</div>
		</>
	);
}

function QuickLinks() {
	return (
		<>
			<h2>Quick Solutions for all your travel needs.</h2>
			<div className="quick-links-navigations">
				<p>flights by city</p>
				{/* use EMT for guidance. this is the webpage : https://www.easemytrip.com/directory/flights.html*/}
				<p>domestic flights</p>
				{/* https://www.easemytrip.com/flights/domestic-flight/ */}
				<p>Train routes</p>
				{/* https://www.easemytrip.com/directory/train-routes.html */}
				<p>Hotel directory</p>
				{/* https://www.easemytrip.com/directory/hotels-in-india.html */}
				<p>and other links present in the quick links section</p>
			</div>
		</>
	);
}

function PopularDestination() {}

// in popular airline, we will pre-set the src, dest, no of travellers, date and apply the filteration API with the name of airline as value
