export default function Hotels() {
	return (
		<div className="avy">
			{" "}
			I AM IN HOTELS
			<p>
				window.navigator.userAgentData.mobile,{" "}
				{window.navigator.userAgentData.mobile
					? "mobile"
					: "not mobile"}
			</p>
		</div>
	);
}
