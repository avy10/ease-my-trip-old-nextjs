import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useState, useEffect } from "react";
import styles from "./LoginModal.module.css";
import { createPortal } from "react-dom";
import { LOGIN_MODAL_SLIDER } from "@/public/utils/loginSliderContent";
import LoginSignUpForms from "./LoginSignUpForms";
export default function LoginModal({ handleClose, showModal }) {
	const [imageIndex, setImageIndex] = useState(0);
	let key;

	useEffect(() => {
		clearTimeout(key);
		key = setTimeout(() => {
			// setImageIndex((prev) => (prev + 1) % IMAGE_SLIDESHOW_IMAGES.length);
			setImageIndex(
				(prev) => (prev + 1) % Object.keys(LOGIN_MODAL_SLIDER).length
			);
		}, 5000);
	}, [imageIndex]);
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	return (
		<Modal
			open={showModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="login-modal-backdrop"
		>
			<Box sx={style} className={styles.loginModal}>
				<div className={styles.loginAndSlideshowModal}>
					{Object.entries(LOGIN_MODAL_SLIDER).map(
						(ele, index) =>
							index == imageIndex && (
								<ImageSlideShow key={index} element={ele[1]} />
							)
					)}
					<LoginSignUpForms onModalClose={handleClose} />
				</div>
			</Box>
		</Modal>
	);
}
function ImageSlideShow({ element }) {
	return (
		<div className={styles.imageSliderBox}>
			<div className={styles.centerThisDiv + " flex-center-center"}>
				<div className={styles.imgBox}>
					<img src={element?.icon?.src} />
				</div>
				<div className={styles.textBox}>
					<h2>{element?.header}</h2>
					<p>{element?.text}</p>
				</div>
			</div>
		</div>
	);
}

export function CloseModalButton({ onModalClose }) {
	return (
		<button className="close-modal-button" onClick={onModalClose}>
			X
		</button>
	);
}
