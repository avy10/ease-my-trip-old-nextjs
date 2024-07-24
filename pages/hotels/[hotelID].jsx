import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import HotelSummaryImages from "@/components/Hotels/HotelID/HotelSummaryImages";
import HotelDetailsNavigations from "@/components/Hotels/HotelID/HotelDetailsNavigations";
import HotelRooms from "@/components/Hotels/HotelID/HotelRooms";
import { useHotelSearchContext } from "@/contexts/HotelSearchContext";
import BookingPolicy from "@/components/Hotels/HotelID/BookingPolicy";
import HotelAmenities from "@/components/Hotels/HotelID/Amenities/HotelAmenities";

export default function FullHotelDescription() {
	const router = useRouter();
	const { hotelID } = router.query;
	const { updateRoomsGuests } = useHotelSearchContext();
	const [hotelData, setHotelData] = useState(undefined);
	const [loadingHotelDetails, setLoadingHotelDetails] = useState(false);
	const [errorLoadingHotelDetails, setErrorLoadingHotelDetails] =
		useState(false);
	function fetchHotelDetails() {
		if (hotelID === undefined) return;
		try {
			const URL = `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelID}`;
			fetch(URL, {
				method: "GET",
				headers: {
					projectID: "qwqzgpiy336h",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setHotelData(data?.data);
				});
		} catch (error) {
			console.log(error);
			setErrorLoadingHotelDetails(true);
		} finally {
			setLoadingHotelDetails(false);
		}
	}
	useEffect(() => {
		setLoadingHotelDetails(true);
		const { rooms, pax } = router.query;
		if (rooms !== undefined || pax !== undefined) {
			updateRoomsGuests("roomsDirect", undefined, +rooms);
			updateRoomsGuests("adultsDirect", undefined, +pax);
		}
		fetchHotelDetails();
	}, [router.isReady]);
	return (
		<Container
			maxWidth="lg"
			style={{
				position: "relative",
				top: "110px",
			}}
		>
			{hotelData !== undefined && (
				<>
					<HotelSummaryImages hotelData={hotelData} />
					<HotelDetailsNavigations />
					<HotelRooms hotelRooms={hotelData?.rooms} />
					<HotelAmenities hotelAmenities={hotelData?.amenities} />
					<BookingPolicy />
				</>
			)}
		</Container>
	);
}
