import { FAMOUS_TOURIST_DESTINATION_ARRAY } from "@/public/utils/famousTouristAttractionsList";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// css in flightsHome. UPDATE : moved to module file
import styles from "./FamousTouristAttraction.module.css";
export default function FamousTouristAttraction() {
	// useEffect(() => {
	// 	console.log(FAMOUS_TOURIST_DESTINATION_ARRAY[0].iconsFullDetails);
	// }, []);
	return (
		<div className={styles.famousTaDiv}>
			<div className="titleDiv">
				<h1 className="titleEO">Famous Tourist Attraction</h1>
			</div>
			<Container maxWidth="lg">
				<div className={styles.taListFlexbox}>
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
				className={`${styles.singleTaDiv} flex-center-center`}
				onClick={() => setOpenToolTip(true)}
			>
				<div
					className={styles.imgBox}
					onClick={() => setOpenToolTip(true)}
				>
					<img src={element.iconSource} />
				</div>
				<h4>{element.destinationName}</h4>
			</div>
		</BootstrapTooltip>
	);
}
