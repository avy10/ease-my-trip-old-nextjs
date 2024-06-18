import { FAMOUS_TOURIST_DESTINATION_ARRAY } from "@/public/utils/famousTouristAttractionsList";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// css in flightsHome
export default function FamousTouristAttraction() {
	// useEffect(() => {
	// 	console.log(FAMOUS_TOURIST_DESTINATION_ARRAY[0].iconsFullDetails);
	// }, []);
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
	const [openToolTip, setOpenToolTip] = useState(false);
	const handleClose = () => {
		setOpenToolTip(false);
	};

	const handleOpen = () => {
		setOpenToolTip(true);
	};

	const BootstrapTooltip = styled(({ className, ...props }) => (
		<Tooltip
			open={openToolTip}
			onClose={handleClose}
			onOpen={handleOpen}
			{...props}
			arrow
			classes={{ popper: className }}
			slotProps={{
				popper: {
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -14],
							},
						},
					],
				},
			}}
		/>
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
			<div
				className="single-ta-div flex-center-center"
				onClick={() => setOpenToolTip(true)}
			>
				<div
					className="img-box"
					style={{ height: "112px", width: "112px" }}
					onClick={() => setOpenToolTip(true)}
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
