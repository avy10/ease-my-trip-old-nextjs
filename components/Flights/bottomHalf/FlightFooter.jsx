const listItems = [
	"OUR OFFERINGS",
	"QUICK LINKS",
	"POPULAR DESTINATIONS",
	"CONNECT WITH US",
	"OFFERS",
];

export default function FlightFooter() {
	return (
		<div className="flightFooter">
			<LeftFooter />
			<RightFooter />
		</div>
	);
}

function LeftFooter() {
	return (
		<div className="leftFooter">
			<ul className="leftFooterUL">
				{listItems.map((ele, index) => (
					<li key={index}>{ele}</li>
				))}
			</ul>
		</div>
	);
}

function RightFooter() {
	return <div className="rightFooter"></div>;
}
