import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import mobileRefundIcon from "@/public/assests/images/icons/hotelsIcons/double_refund_hotel_mobile.webp";
import desktopRefundIcon from "@/public/assests/images/icons/hotelsIcons/double_refund_desktop.webp";
export default function PriceGuarantee() {
	const authorisationStoreData = useAuthorisationContext();
	const { width } = authorisationStoreData;

	return (
		<div
			className="hotel-refund-"
			style={{
				width: "95%",
				margin: "auto auto",
			}}
		>
			<img
				style={{
					width: "100%",
				}}
				src={width > 600 ? desktopRefundIcon.src : mobileRefundIcon.src}
			/>
		</div>
	);
}

function RefundDivOverlay() {
	return <div className="hotel-refund-overlay"></div>;
}
