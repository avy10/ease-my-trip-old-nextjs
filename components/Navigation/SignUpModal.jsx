import { useAuthorisationContext } from "@/contexts/AuthorisationContext";
import { useState } from "react";
import { createPortal } from "react-dom";
import LoginModal from "../LoginComponents/LoginModal";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import { green } from "@mui/material/colors";
import Profile from "./Profile";

import styles from "./SignUpModal.module.css";

function nameInitials(userName) {
	const nameArr = userName.split(" ");
	if (nameArr.length == 1) {
		return nameArr[0][0] + nameArr[0][1];
	} else {
		return nameArr[0][0] + nameArr[1][0];
	}
}
export default function SignUpModal() {
	const { isLoggedIn, userName } = useAuthorisationContext();

	// for modal
	const [showModal, setShowModal] = useState(false);
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setShowModal(true);
	// 	}, 750);
	// }, []);

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);

	const [showProfile, setShowProfile] = useState(false);
	function toggleShowProfile() {
		setShowProfile((prev) => !prev);
	}
	return (
		<>
			{!isLoggedIn && (
				<div
					className={`${styles.loginPortal} flex-center-center`}
					onClick={handleOpen}
				>
					<div
						className={`${styles.signInDiv} showAllOffersBTN  flex-center-center`}
					>
						Sign In<>&nbsp;</>
						<LoginIcon />
					</div>
				</div>
			)}
			{isLoggedIn && (
				<div className={styles.loginPortal} onClick={toggleShowProfile}>
					<div className={`${styles.avatarDiv} flex-center-center`}>
						<Avatar
							sx={{
								bgcolor: "#4dabf5",
								width: 50,
								height: 50,
							}}
							children={nameInitials(userName)}
							id={styles.avy}
						/>
					</div>
					{showProfile && <Profile userName={userName} />}
					{showProfile &&
						createPortal(
							<div
								className={styles.avatarOverlay}
								onClick={(e) => {
									e.stopPropagation();
									console.log("OVERLAY IS WORKING");
									setShowProfile(false);
								}}
							>
								{/* this component was created before I knew useEffect has a cleanup function which can remove eventListener
so it is a box with no color and clicking on it closes the profile overlay
*/}
							</div>,
							document.body
						)}
				</div>
			)}
			{showModal &&
				createPortal(
					<LoginModal
						handleClose={handleClose}
						showModal={showModal}
					/>,
					document.body
				)}
		</>
	);
}
