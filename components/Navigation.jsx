import { useContext, useEffect, useState } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";
import LoginModal from "./LoginComponents/LoginModal";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import { green } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import slider1amzdeal from "@/public/assests/images/login/slider1amzdeal.png";
const ROUTES = [
	{
		id: "flight-nav",
		path: "/flights",
		name: "FLIGHTS",
	},
	{
		id: "hotel-nav",
		path: "/hotels",
		name: "HOTELS",
	},
	{
		id: "train-nav",
		path: "/trains",
		name: "TRAINS",
	},
	{
		id: "bus-nav",
		path: "/buses",
		name: "BUSES",
	},
];
export default function Navigation() {
	const authorisationContextData = useContext(AuthorisationContext);
	const { isLoggedIn, userName } = authorisationContextData;
	const [scrollLengthY, setScrollLengthY] = useState(false);

	// for modal
	const [showModal, setShowModal] = useState(false);
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setShowModal(true);
	// 	}, 750);
	// }, []);

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);

	// for rendering the smaller navigation
	const handleChange = () => {
		if (window.scrollY >= 40) {
			setScrollLengthY(true);
		} else {
			setScrollLengthY(false);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleChange);
	}, []);

	const [showProfile, setShowProfile] = useState(false);
	function toggleShowProfile() {
		setShowProfile((prev) => !prev);
	}

	return (
		<nav>
			<div
				className={
					scrollLengthY ? "navigation-div mini-nav" : "navigation-div"
				}
			>
				<div className="emt-icon">
					<Link href="/">
						<Image
							src="https://www.easemytrip.com/images/brandlogo/emtlogo_new8.svg"
							height={scrollLengthY ? 40 : 60}
							width={scrollLengthY ? 170 : 200}
							alt={"go to homepage"}
						/>
					</Link>
				</div>
				<PageNavigations scrollLengthY={scrollLengthY} />
				{/* {!scrollLengthY && (
				<PageNavigations scrollLengthY={scrollLengthY} />
			)} */}
				{/* {scrollLengthY && <MiniPageNavigations />} */}
				{!isLoggedIn && (
					<div
						className="login-portal flex-center-center"
						onClick={handleOpen}
					>
						<div className="sign-in-div showAllOffersBTN  flex-center-center">
							Sign In<>&nbsp;</>
							<LoginIcon />
						</div>
					</div>
				)}
				{isLoggedIn && (
					<div className="login-portal" onClick={toggleShowProfile}>
						<div className="avatar-div flex-center-center">
							<Avatar
								sx={{
									bgcolor: "#4dabf5",
									width: 50,
									height: 50,
								}}
								children={nameInitials(userName)}
							/>
						</div>
						{showProfile && <Profile userName={userName} />}
						{showProfile &&
							createPortal(
								<div
									className="avatar-overlay"
									onClick={(e) => {
										e.stopPropagation();
										console.log("OVERLAY IS WORKING");
										setShowProfile(false);
									}}
								></div>,
								document.body
							)}
					</div>
				)}
			</div>
			{showModal &&
				createPortal(
					<LoginModal
						handleClose={handleClose}
						showModal={showModal}
					/>,
					document.body
				)}
		</nav>
	);
}
function nameInitials(userName) {
	const nameArr = userName.split(" ");
	if (nameArr.length == 1) {
		return nameArr[0][0] + nameArr[0][1];
	} else {
		return nameArr[0][0] + nameArr[1][0];
	}
}
// {showModal &&
// !isLoggedIn &&
function PageNavigations({ scrollLengthY }) {
	const router = useRouter();
	// console.log(router.pathname);
	return (
		<div className="page-navigations">
			<ul className="page-navigations-ul">
				{ROUTES.map((ele) => (
					<li id={ele.id} key={ele.id}>
						<Link href={ele.path}>
							<div
								className={
									router.pathname.includes(ele.path)
										? "nav-container active"
										: "nav-container"
								}
							>
								<div className="blankSpace"></div>
								{!scrollLengthY && (
									<div
										className={
											router.pathname.includes(ele.path)
												? "nav-text nav-text-active"
												: "nav-text"
										}
									>
										{ele.name}
									</div>
								)}
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

/* 
logic to match the pathname has been changed from router.pathname == ele.path
to current iteration
this ensures that the current section remains highlighted as long as we are on that sub-domain
the 4 main sub-domain are : flights, hotels, buses, trains
maybe I will add about later on

*/

function Profile({ userName }) {
	const profileElementData = [
		{
			text: <span>{`Welcome ${userName}!`}</span>,
			children: <></>,
		},
		{
			text: `My Profile`,
			children: <AccountBoxIcon sx={{ color: "#4dabf5" }} />,
		},
		{
			text: `My Bookings`,
			children: <ConfirmationNumberIcon sx={{ color: "#4dabf5" }} />,
		},
		{
			text: `Sign Out`,
			children: <LogoutIcon />,
		},
	];
	return (
		<div className="user-div">
			{profileElementData.map((element, index) => (
				<SingleProfileElement
					text={element.text}
					children={element.children}
					key={index}
				/>
			))}
		</div>
	);
	// return (
	// 	<div className="user-div">
	// 		<div className="user-div-elements-package">
	// 			<div className="arrow-div"></div>
	// 			<div className="welcome-user">Welcome {userName}!</div>
	// 		</div>
	// 		<div className="user-div-elements-package">
	// 			<div className="arrow-div"></div>
	// 			<div className="my-profile-div">My Profile</div>
	// 		</div>
	// 		<div className="user-div-elements-package">
	// 			<div className="arrow-div"></div>
	// 			<div className="my-booking-div sign-out-div">
	// 				My Bookings

	// 			</div>
	// 		</div>
	// 		<div className="user-div-elements-package ">
	// 			<div className="arrow-div "></div>
	// 			<div className="sign-out-div">
	// 				Sign Out<>&nbsp;</>

	// 			</div>
	// 		</div>
	// 	</div>
	// );
}

function SingleProfileElement({ text, children }) {
	const [showArrowDiv, setShowArrowDiv] = useState(false);

	return (
		<div
			className={"user-div-elements-package"}
			onMouseEnter={() => setShowArrowDiv(true)}
			onMouseLeave={() => setShowArrowDiv(false)}
		>
			<div className="arrow-div">
				{showArrowDiv && <DoubleArrowIcon sx={{ color: "#4dabf5" }} />}
			</div>
			<div className="text-div">
				{text}
				<>&nbsp;</>
				{children}
			</div>
		</div>
	);
}
