import { useContext, useEffect, useRef, useState } from "react";
import AuthorisationContext from "@/contexts/AuthorisationContext";

import LoginButtons from "./ReusableLoginComponents/LoginButtons";
import EmailPasswordForms from "./ReusableLoginComponents/EmailPasswordForms";
import { CloseModalButton } from "./LoginModal";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
// Please Enter Correct Email
// Error in password or username
export default function LoginForm({
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
	const [loading, setIsLoading] = useState(false);

	function loginSubmission() {
		setIsLoading(true);

		if (emailError || userEmail == "") {
			emailIDRef?.current?.focus();
			setSnackbarMsg("Invalid Email");
			openSnackBar();
			setIsLoading(false);
			return;
		}
		if (passwordError || userPassword == "") {
			passwordRef?.current?.focus();
			setSnackbarMsg("Invalid Password");
			openSnackBar();
			setIsLoading(false);
			return;
		}

		const myHeaders = new Headers();
		myHeaders.append("projectId", "4xh7gn2pv8it");
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
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
			"https://academics.newtonschool.co/api/v1/bookingportals/login",
			requestOptions
		)
			.then((response) => {
				// console.log(response);
				// console.log(response.status);
				// console.log(response.ok);
				if (response.ok) {
					return response.json();
				} else {
					return {
						status: "fail",
						message: "Invalid email or password",
					};
				}
			})
			.then((data) => {
				// console.log(data);
				if (data?.status == "success") {
					setSnackbarMsg("Successfully logged in");
					openSnackBar();
					logMeIn(
						data?.data?.user?.name,
						data?.data?.user?.email,
						data?.data?.user?._id,
						data?.token
					);
					setUser(data?.data?.user?.name);
					// localStorage.setItem(
					// 	"userSessionToken",
					// 	JSON.stringify(result?.token)
					// );
					setTimeout(() => {
						// console.log("TIME ITS RUNNINGB");
						onModalClose();
					}, 1500);
					//there are more code that needs to be written here
					// 1. to show the logged in success message
					// 2. close the modal
					// 3. refresh the webpage, while preserving the URL parameters or, states

					// for now, manually close the modal so you can see the username
				}
				if (data?.status == "fail") {
					setSnackbarMsg(data?.message);
					openSnackBar();
				}
				setUserPassword("");
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		emailIDRef.current.focus();
	}, []);

	return (
		<div className="login-form">
			<CloseModalButton onModalClose={onModalClose} />
			<h2>Login</h2>
			{loading && (
				<Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
					<LinearProgress color="secondary" />
				</Stack>
			)}
			<div className="form-elements">
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
				<LoginButtons
					clickFunction={loginSubmission}
					buttonText={"Login"}
					paraText={"Not a User? Signup"}
					paraFunction={toggleLoginSignUpBox}
				/>
			</div>
		</div>
	);
}
