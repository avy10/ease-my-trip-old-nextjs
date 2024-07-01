import Container from "@mui/material/Container";

export default function WhyUs({ content }) {
	return (
		<Container maxWidth="lg">
			<div className="why-us">
				<div className="titleDiv">
					<h1 className="title-EO">Why book with us?</h1>
				</div>
				<div className="why-us-Cards">
					{content.map((ele) => (
						<div key={ele.id} className="why-us-DIVCard">
							<div className="why-us-IconDiv">
								<img src={ele.icon} alt={ele.alt} />
							</div>
							<h2 className="why-us-Title">{ele.heading}</h2>
							<p className="why-us-Text">{ele.text}</p>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}
