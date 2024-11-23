import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import { createPortal } from "react-dom";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import styles from "./LoginSignUpForms.module.css";
const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_FORMAT = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
/* 
In summary, the password must:

    Be at least 8 characters in length.
    Include at least one digit.
    Include at least one lowercase letter.
    Include at least one uppercase letter.
    Include at least one special character from !@#$%^&*.
*/
export default function LoginSignUpForms({ onModalClose }) {
	const [loginBox, setLoginBox] = useState(true); // state to display login box or signup box

	function toggleLoginSignUpBox() {
		setLoginBox((prev) => !prev);
	}
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

	// user data
	// userName is already present in the Authorisation context
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	// refs
	const emailIDRef = useRef();
	const passwordRef = useRef();

	function checkEmail() {
		// if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
		// }

		if (userEmail.match(EMAIL_FORMAT)) {
			setEmailError(false);
		} else {
			userEmail !== "" && setEmailError(true);

			userEmail !== "" && setEmailErrorMessage("Invalid email");
		}
		// if (userEmail == "") {
		// 	setEmailError(false);
		// }
	}
	function removeErrorOnFocus(type) {
		// console.log("ugh");
		if (type == "email") {
			setEmailError(false);
		}
		if (type == "password") {
			setPasswordError(false);
		}
	}

	function checkPassword() {
		if (userPassword.match(PASSWORD_FORMAT)) {
			setPasswordError(false);
			setPasswordErrorMsg("");
		} else {
			setPasswordError(true);
			setPasswordErrorMsg("Invalid password format");
		}

		if (userPassword == "") {
			setPasswordError(false);
			setPasswordErrorMsg("");
		}
	}

	/*  */
	const [snackbarOpen, setSnackbaropen] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState("");
	function openSnackBar() {
		setSnackbaropen(true);
	}
	function closeSnackBar() {
		setSnackbaropen(false);
	}
	/*  */
	return (
		<>
			<div className="snackbar-anchor">
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					open={snackbarOpen}
					onClose={closeSnackBar}
					message={snackbarMsg}
					key={"top center"}
					sx={{ backgroundColor: "black" }}
					autoHideDuration={2000}
				/>
			</div>

			{loginBox && (
				<div className={styles.loginFormMainBox}>
					<LoginForm
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
						toggleLoginSignUpBox={toggleLoginSignUpBox}
						onModalClose={onModalClose}
						setSnackbarMsg={setSnackbarMsg}
						openSnackBar={openSnackBar}
						closeSnackBar={closeSnackBar}
						removeErrorOnFocus={removeErrorOnFocus}
					/>
					<TermsAndCondition text={"logging in"} />
				</div>
			)}
			{!loginBox && (
				<div className={styles.signupFormMainBox}>
					<SignUpForm
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
						toggleLoginSignUpBox={toggleLoginSignUpBox}
						onModalClose={onModalClose}
						setSnackbarMsg={setSnackbarMsg}
						openSnackBar={openSnackBar}
						closeSnackBar={closeSnackBar}
						removeErrorOnFocus={removeErrorOnFocus}
					/>
					<TermsAndCondition text={"signin up"} />
				</div>
			)}
		</>
	);
}
function TermsAndCondition({ text }) {
	return (
		<div className="tnc-div">
			<p>
				By {text}, I understand & agree to EaseMyTrip's{" "}
				<a>Terms of use</a> and <a>Privacy policy</a>
			</p>
		</div>
	);
}
