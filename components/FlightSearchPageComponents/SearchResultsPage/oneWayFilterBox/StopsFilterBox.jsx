export default function StopsFilter() {
	return (
		<div className="stops-filter-box">
			{["0", "1", "2+"].map((ele, index) => (
				<div className="single-stop-box flex-center-center" key={index}>
					<p>{ele}</p>
					<p>
						{ele === "0"
							? "NonStop"
							: ele === "1"
							? "Stop"
							: "Stops"}
					</p>
				</div>
			))}
		</div>
	);
}
