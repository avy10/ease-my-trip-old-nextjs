import { FAMOUS_TOURIST_DESTINATION_ARRAY } from "@/public/utils/famousTouristAttractionsList";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function FamousTouristAttraction() {
	useEffect(() => {
		console.log(FAMOUS_TOURIST_DESTINATION_ARRAY[0].iconsFullDetails);
	}, []);
	return (
		<div className="famous-ta-div">
			<div className="titleDiv">
				<h1 className="title-EO">Famous Tourist Attraction</h1>
			</div>
			<Container maxWidth="lg">
				<div className="ta-list-flexbox">
					{FAMOUS_TOURIST_DESTINATION_ARRAY.map((element, index) => (
						<SingleDestinationBox element={element} key={index} />
					))}
				</div>
			</Container>
		</div>
	);
}

function SingleDestinationBox({ element }) {
	const BootstrapTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} arrow classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: theme.palette.common.black,
		},
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.black,
		},
	}));
	return (
		<BootstrapTooltip title="COMING SOON" arrow>
			<div className="single-ta-div flex-center-center">
				<div
					className="img-box"
					style={{ height: "112px", width: "112px" }}
				>
					<img
						src={element.iconSource}
						style={{ height: "112px", width: "112px" }}
					/>
				</div>
				<h4>{element.destinationName}</h4>
			</div>
		</BootstrapTooltip>
	);
}
