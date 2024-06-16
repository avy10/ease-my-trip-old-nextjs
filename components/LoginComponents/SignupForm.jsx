import { useContext, useEffect, useRef, useState } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";
import Divider from "@mui/material/Divider";
import LoginInputBox from "./LoginComponents/LoginInputBox";

import { styled } from "@mui/material/styles";
import EmailPasswordForms from "./LoginComponents/EmailPasswordForms";
import LoginButtons from "./LoginComponents/LoginButtons";
import { CloseModalButton } from "./LoginModal";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
// const USERNAME_FORMAT = /^[0-9A-Za-z]{6,16}$/; // wont be using this, we are supposed to be using name
const NAME_FORMAT = /^[a-zA-Z]{3,30}$/;

export default function SignUpForm({
	emailError,
	setEmailError,
	emailErrorMessage,
	setEmailErrorMessage,
	passwordError,
	setPasswordError,
	passwordErrorMsg,
	setPasswordErrorMsg,
	userEmail,
	setUserEmail,
	userPassword,
	setUserPassword,
	emailIDRef,
	passwordRef,
	checkEmail,
	checkPassword,
	toggleLoginSignUpBox,
	onModalClose,
	setSnackbarMsg,
	openSnackBar,
	closeSnackBar,
	removeErrorOnFocus,
}) {
	const userData = useContext(AuthorisationContext);
	const { isLoggedIn, logMeIn, userName, setUser } = userData;

	const [signUpName, setSignUpName] = useState("");
	const [nameError, setNameError] = useState(false);
	const [nameErrorMsg, setNameErrorMsg] = useState("");
	const [loading, setIsLoading] = useState(false);

	const nameRef = useRef();
	function checkName() {
		if (signUpName.match(NAME_FORMAT)) {
			setNameError(false);
		} else {
			signUpName !== "" && setNameError(true);

			signUpName !== "" &&
				setNameErrorMsg("Name should be 3-30 characters long");
		}
	}
	function removeNameErrorOnFocus() {
		setNameError(false);
	}
	function signUpAction() {
		setIsLoading(true);
		if (nameError || signUpName == "") {
			setIsLoading(false);
			nameRef?.current?.focus();
			setIsLoading(false);
			return;
		}
		if (emailError || userEmail == "") {
			emailIDRef?.current?.focus();
			setIsLoading(false);
			setIsLoading(false);
			return;
		}
		if (passwordError || userPassword == "") {
			setIsLoading(false);
			passwordRef?.current?.focus();
			setIsLoading(false);
			return;
		}
		// console.log("email field", userEmail);
		// console.log("password field", userPassword);
		// console.log("name field", signUpName);

		const myHeaders = new Headers();
		myHeaders.append("projectId", "4xh7gn2pv8it");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("random", "adsaav");

		const raw = JSON.stringify({
			name: signUpName,
			email: userEmail,
			password: userPassword,
			appType: "bookingportals",
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://academics.newtonschool.co/api/v1/bookingportals/signup",
			requestOptions
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					return response.json();
				}
			})
			.then((data) => {
				console.log("singup result", data);
				if (data?.status == "fail") {
					setSnackbarMsg(data?.message);
					openSnackBar();
					toggleLoginSignUpBox();
				}

				if (data?.status == "success") {
					setSnackbarMsg("Successfully signed up");
					openSnackBar();
					logMeIn(
						data?.data?.user?.name,
						data?.data?.user?.email,
						data?.data?.user?._id,
						data?.token
					);
					setTimeout(() => {
						onModalClose();
					}, 2500);
				}
				setIsLoading(false);
				setUserPassword("");
			})
			.catch((error) => console.error(error));
	}
	useEffect(() => {
		nameRef?.current?.focus();
	}, []);
	return (
		<div className="signup-form">
			<CloseModalButton onModalClose={onModalClose} />
			<h2>SignUp</h2>
			{loading && (
				<Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
					<LinearProgress color="secondary" />
				</Stack>
			)}
			{/* insert horizonral bar here */}
			{/* <Divider
				sx={{
					color: "black",
					backgroundColor: "black",
					borderColor: "black",
					zIndex: "35",
				}}
			/> */}
			<div className="form-elements">
				<div className="single-form-element">
					<label htmlFor="user-name">Name*</label>
					<LoginInputBox
						inputValue={signUpName}
						changeFunction={setSignUpName}
						inputType={"text"}
						inputID={"user-name"}
						inputName={"user-name"}
						inputPlaceholder={"Enter your name"}
						blurFunction={checkName}
						refTarget={nameRef}
						errorBoolean={nameError}
						errorMessage={nameErrorMsg}
						focusFunction={removeNameErrorOnFocus}
					/>
					<EmailPasswordForms
						emailError={emailError}
						setEmailError={setEmailError}
						emailErrorMessage={emailErrorMessage}
						setEmailErrorMessage={setEmailErrorMessage}
						passwordError={passwordError}
						setPasswordError={setPasswordError}
						passwordErrorMsg={passwordErrorMsg}
						setPasswordErrorMsg={setPasswordErrorMsg}
						userEmail={userEmail}
						setUserEmail={setUserEmail}
						userPassword={userPassword}
						setUserPassword={setUserPassword}
						emailIDRef={emailIDRef}
						passwordRef={passwordRef}
						checkEmail={checkEmail}
						checkPassword={checkPassword}
						removeErrorOnFocus={removeErrorOnFocus}
					/>
				</div>
				<LoginButtons
					clickFunction={signUpAction}
					buttonText={"SignUp"}
					paraText={"Already a User? Login"}
					paraFunction={toggleLoginSignUpBox}
				/>
			</div>
		</div>
	);
}
