import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useState, useEffect } from "react";

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
			<Box sx={style} className="login-modal">
				<div className="login-and-slideshow-modal">
					{Object.entries(LOGIN_MODAL_SLIDER).map(
						(ele, index) =>
							index == imageIndex && (
								<ImageSlideShow key={index} element={ele[1]} />
							)
					)}
				</div>
				<LoginSignUpForms onModalClose={handleClose} />
			</Box>
		</Modal>
	);
}
function ImageSlideShow({ element }) {
	return (
		<div className="image-slider-box">
			<div className="center-this-div flex-center-center">
				<div className="img-box">
					<img src={element?.icon?.src} />
				</div>
				<div className="text-box">
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
