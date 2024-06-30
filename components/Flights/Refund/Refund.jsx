import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import fullRef from "@/public/assests/images/icons/refund/full-ref-lft.png";
import tncIcon from "@/public/assests/images/icons/refund/full-ref-rgt.png";
import covidIcon from "@/public/assests/images/icons/refund/covid-refund.png";
import EastIcon from "@mui/icons-material/East";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
export default function Refund() {
	return (
		<>
			<FullRefundSectionDesktop />
		</>
	);
}
function FullRefundSectionDesktop() {
	const authorisationContextData = useAuthorisationContext();
	const { width } = authorisationContextData;

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

	// style={{
	// 	border: "2px solid blue",
	// }}
	return (
		<Container maxWidth="lg">
			<section className="refundSection flex-center-center">
				<div className="full-refund-section">
					{width > 650 && (
						<div className="refundIcon">
							<img src={fullRef.src} alt="Full Refund" />
						</div>
					)}
					<div className="refundText">
						<div className="refundTextTitle">
							<h1>Full Refund*</h1>
							<span>Due to medical reasons</span>
						</div>
						<div className="refundTextContent">
							<ul>
								<li>
									Presenting you an extraordinary offer in
									these unfavorable circumstances..
								</li>
								<li>
									Get a full refund on a domestic ticket in
									case you cancel it due to medical sickness..
								</li>
								<li>
									The Best Part - There are ZERO extra charges
									for this service.
								</li>
							</ul>
						</div>
					</div>
					{width > 650 && (
						<div className="termsnconditionICON">
							<img src={tncIcon.src} alt="Medical Refund" />
							<div className="termsnconditionTEXT">
								*T&amp;Cs Apply{" "}
							</div>
						</div>
					)}
				</div>
				<BootstrapTooltip title="COMING SOON" arrow>
					<div
						className="covid-refund-section flex-center-center"
						onClick={() => setOpenToolTip(true)}
					>
						<div className="covid-refund-text ">
							Claim for{" "}
							<span className="covid-refund-text-bold">
								COVID REFUND
							</span>
							here
							<span className="covid-refund-text-icon">
								<EastIcon />
							</span>
						</div>
						<div className="covid-refund-icon">
							<img src={covidIcon.src} />
						</div>
					</div>
				</BootstrapTooltip>
			</section>
		</Container>
	);
}
