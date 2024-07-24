import styles from "./HotelAmenities.module.css";

import airCon from "@/public/assests/images/hotel-amenities/air-conditioning.svg";
import Bar from "@/public/assests/images/hotel-amenities/bar-lounge.svg";
import bathroomAmenities from "@/public/assests/images/hotel-amenities/bathroom-amenities.svg";
import breakfastServices from "@/public/assests/images/hotel-amenities/breakfast-services.svg";
import cctv from "@/public/assests/images/hotel-amenities/CCTV.svg";
import newsPaper from "@/public/assests/images/hotel-amenities/complimentary-newspaper.svg";
import concierge from "@/public/assests/images/hotel-amenities/concierge-services.svg";
import cribs from "@/public/assests/images/hotel-amenities/cribs-available.svg";
import doctorCall from "@/public/assests/images/hotel-amenities/Doctor-onCall.svg";
import drinkingWater from "@/public/assests/images/hotel-amenities/drinking-water.svg";
import elevator from "@/public/assests/images/hotel-amenities/elevator-lift.svg";
import lounge from "@/public/assests/images/hotel-amenities/Executive-Lounge.svg";
import fireExtin from "@/public/assests/images/hotel-amenities/Fire-Extinguishers.svg";
import FreeWiFi from "@/public/assests/images/hotel-amenities/Free-Wifi.svg";
import frontDesk from "@/public/assests/images/hotel-amenities/Front-Desk.svg";
import Gym from "@/public/assests/images/hotel-amenities/gym-fitness-center.svg";
import heater from "@/public/assests/images/hotel-amenities/Heater-On-request.svg";
// import houseKeeping from "@/public/assests/images/hotel-amenities/houseKeeping.svg";
import laundry from "@/public/assests/images/hotel-amenities/Laundry.svg";
import paidPickDrop from "@/public/assests/images/hotel-amenities/Paid-Pick up-Drop.svg";
import powerBackup from "@/public/assests/images/hotel-amenities/Power-Backup.svg";
import premiumBedding from "@/public/assests/images/hotel-amenities/premium-bedding.svg";
import premiumTV from "@/public/assests/images/hotel-amenities/premium-tv-channels.svg";
import publicRestroom from "@/public/assests/images/hotel-amenities/Public-Restroom.svg";
import readingLamps from "@/public/assests/images/hotel-amenities/reading-lamps.svg";
import Restaurant from "@/public/assests/images/hotel-amenities/Restaurant.svg";
import roomService from "@/public/assests/images/hotel-amenities/room-service.svg";
import Spa from "@/public/assests/images/hotel-amenities/spa-services.svg";
import slippers from "@/public/assests/images/hotel-amenities/slippers.svg";
import smokingArea from "@/public/assests/images/hotel-amenities/Smoking-area.svg";
import childFriendly from "@/public/assests/images/hotel-amenities/suitable-for-children.svg";
import SwimmingPool from "@/public/assests/images/hotel-amenities/Swimming-Pool.svg";
import tv from "@/public/assests/images/hotel-amenities/television-facility.svg";
import wheelChair from "@/public/assests/images/hotel-amenities/Wheelchair-accessible.svg";
const SPECIFIC_AMENITIES = {
	Restaurant: {
		icon: Restaurant.src,
	},
	Bar: {
		icon: Bar.src,
	},
	Spa: {
		icon: Spa.src,
	},
	Gym: {
		icon: Gym.src,
	},
	FreeWiFi: {
		icon: FreeWiFi.src,
	},
	SwimmingPool: {
		icon: SwimmingPool.src,
	},
};
const COMMON_HOTEL_AMENITIES = [
	{
		id: 10,
		name: "Front Desk",
		icon: frontDesk.src,
	},
	{
		id: 11,
		name: "Power Backup",
		icon: powerBackup.src,
	},
	{
		id: 12,
		name: "Fire Extinguishers",
		icon: fireExtin.src,
	},
	{
		id: 13,
		name: "Wheelchair Access",
		icon: wheelChair.src,
	},
	{
		id: 14,
		name: "Public Restroom",
		icon: publicRestroom.src,
	},
	{
		id: 15,
		name: "Elevator",
		icon: elevator.src,
	},
	{
		id: 16,
		name: "Concierge Services",
		icon: concierge.src,
	},
	{
		id: 17,
		name: "Room services",
		icon: roomService.src,
	},
	{
		id: 18,
		name: "Complimentary Newspaper",
		icon: newsPaper.src,
	},
	{
		id: 19,
		name: "Bathroom Amenities",
		icon: bathroomAmenities.src,
	},
	// {
	// 	id: 20,
	// 	name: "Housekeeping",
	// 	icon: houseKeeping.src,
	// },
	{
		id: 21,
		name: "Suitable for Children",
		icon: childFriendly.src,
	},
	{
		id: 22,
		name: "Television Facility",
		icon: tv.src,
	},
	{
		id: 23,
		name: "Reading Lamps",
		icon: readingLamps.src,
	},
	{
		id: 24,
		name: "Premium TV Channels",
		icon: premiumTV.src,
	},
	{
		id: 25,
		name: "Premium Bedding",
		icon: premiumBedding.src,
	},
	{
		id: 26,
		name: "Breakfast Services",
		icon: breakfastServices.src,
	},
	{
		id: 27,
		name: "Cribs Available",
		icon: cribs.src,
	},
	{
		id: 28,
		name: "Slippers",
		icon: slippers.src,
	},
	{
		id: 29,
		name: "Air Conditioning",
		icon: airCon.src,
	},
	{
		id: 30,
		name: "CCTV",
		icon: cctv.src,
	},
	{
		id: 31,
		name: "Doctor on-call",
		icon: doctorCall.src,
	},
	{
		id: 32,
		name: "Heater on-request",
		icon: heater.src,
	},
	{
		id: 33,
		name: "Smoking Area",
		icon: smokingArea.src,
	},
	{
		id: 34,
		name: "Paid Pickup/Drop",
		icon: paidPickDrop.src,
	},
	{
		id: 35,
		name: "Lounge",
		icon: lounge.src,
	},
	{
		id: 36,
		name: "Laundry",
		icon: laundry.src,
	},
	{
		id: 37,
		name: "Drinking Water",
		icon: drinkingWater.src,
	},
];

export default function HotelAmenities({ hotelAmenities }) {
	return (
		<div className={styles.hotelAmenitiesContainer}>
			<h3>AMENITIES</h3>
			<div className={styles.listAmenities}>
				{hotelAmenities.map((ele, index) => {
					const imageName = ele.split(" ").join("");

					return (
						<div className={styles.singleAmenities} key={index}>
							<div className={styles.amenitiesIcon}>
								<img src={SPECIFIC_AMENITIES[imageName].icon} />
							</div>
							<div className={styles.amenitiesText}>{ele}</div>
						</div>
					);
				})}
				{COMMON_HOTEL_AMENITIES.map((ele) => (
					<div className={styles.singleAmenities} key={ele.id}>
						<div className={styles.amenitiesIcon}>
							<img src={ele.icon} />
						</div>
						<div className={styles.amenitiesText}>{ele.name}</div>
					</div>
				))}
			</div>
		</div>
	);
}
