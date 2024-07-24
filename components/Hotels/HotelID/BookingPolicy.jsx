import styles from "./BookingPolicy.module.css";
const BOOKING_POLICY_TEXT = [
	"As per the government regulations, every guest above the 18 years has to carry a valid Photo ID. The identification proofs can be Driving License, Voters Card, Passport and Ration Card. Without valid ID, guests will not be allowed to check in.",
	"EaseMyTrip.com will not be responsible for the check-in denied by the hotel due to the above-mentioned reason.",
	"The primary guest checking-in to the hotel must be minimum of 18 years old. Children accompanying adults may be between 1 and 12 years.",
	"Guests will be charged for extra bed, food and other facilities which are not mentioned in the booking and may vary as per the hotel.",
	"If an extra bed is included in your booking, you may be provided with a folding cot or a mattress as an extra bed (depends on hotel).",
	"Generally, check-in / check-out time varies from hotel to hotel and can be checked on the confirmation voucher, However, for early check-in or late check-out, you are advised to confirm the same directly from the concerned hotel.",
	"The room tariff is inclusive of all taxes but the amount paid does not include charges for any additional services and facilities (such as room service, mini bar, snacks or telephone calls). These services will be charged by the hotel at the time of check-out.",
	"If the hotel denies accommodation to the guests posing as a 'couple' on not providing suitable ID proof, EaseMyTrip.com will not be responsible for this condition and won’t provide any refund for such bookings.",
	"The hotel reserves the right to decline accommodation to locals/city residents. EaseMyTrip.com will not be responsible for any check-in declined by the hotel or any refunds due to the above-mentioned reason.",
	"For any modifications, users have to pay applicable cancellation/modification charges. Modified bookings will be subject to availability and may depend on the booking policy of the hotel. The cancellation/modification charges are standard and any waiver is on the discretion of the hotel.",
	"In case of cancellation or modification, entire benefit (discount / cash back) on the actual booking amount will be forfeited.",
	"EaseMyTrip.com reserves the right, at any time, without prior notice and liability and without assigning any reason whatsoever, to add/alter/modify/change or vary all of these terms and conditions or to replace, wholly or in part, this offer by another offer, whether similar to this offer or not, or to extend or withdraw it altogether.",
	"In case of partial/full cancellation, the offer stands void, and the discount / cash back will be rolled back before processing the refunds.",
	"Gala dinner charges which are applicable for Christmas and New Year dates would be extra and payable directly to the hotel. Please check with the hotel directly for more information on the same.",
	"In case of any amendment (date change) in your hotel reservation, EaseMyTrip.com would inform and advise you about the availability and applicable new rates.",
	"If payment has been received by credit/debit card, the refund shall be credited to the same card by which the payment was received. For all other cases, the refund will be made by Account Payee Cheque only.",
	"Guests are requested to read the terms & conditions before making any booking under the offers running on EaseMyTrip.com.",
	"If any city taxes applicable then it will be directly payable to hotel. For more information, kindly connect with hotelier directly.",
	"All the information pertaining to the hotel including the category of the hotel, images, room type, amenities and facilities available at the hotel are as per the information provided by the hotel to EaseMyTrip.com. This information is for reference only. Any discrepancy that may exist between the website pictures and actual settings of the hotel shall be raised by the User with the hotel directly, and shall be resolved between the User and hotel. EaseMyTrip.com will have no responsibility in that process of resolution, and shall not take any liability for such discrepancies.",
	"Refund, if any shall be processed by EaseMyTrip.com to the customer only upon receipt of the same from the concerned Hotel.",
	"For any query or clarification, please write to us at care@easemytrip.com",
];
export default function BookingPolicy() {
	return (
		<div className={styles.bookingPolicyContainer}>
			<h3>BOOKING POLICY</h3>
			<ul>
				{BOOKING_POLICY_TEXT.map((text, index) => (
					<li key={index}>{text}</li>
				))}
			</ul>
		</div>
	);
}
