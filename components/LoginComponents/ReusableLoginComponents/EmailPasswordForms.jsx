import React, { useState } from "react";
import LoginInputBox from "./LoginInputBox";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const BootstrapTooltip = styled(
	React.forwardRef(({ className, children, ...props }, ref) => (
		<Tooltip ref={ref} {...props} arrow classes={{ popper: className }}>
			{children}
		</Tooltip>
	))
)(({ theme }) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.black,
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.black,
		width: "200px",
	},
}));

export default function EmailPasswordForms({
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
	removeErrorOnFocus,
}) {
	const [visibility, setVisibility] = useState(false);

	return (
		<div className="email-password-div">
			<div className="single-form-element">
				<label htmlFor="email-id">Email*</label>

				<LoginInputBox
					inputValue={userEmail}
					changeFunction={setUserEmail}
					inputType={"email"}
					inputID={"email-id"}
					inputName={"emailID"}
					inputPlaceholder={"Enter your email"}
					blurFunction={checkEmail}
					refTarget={emailIDRef}
					errorBoolean={emailError}
					errorMessage={emailErrorMessage}
					setEmailError={setEmailError}
					focusFunction={removeErrorOnFocus}
				/>
			</div>
			<div className="single-form-element">
				<label htmlFor="password-label">Password*</label>
				<BootstrapTooltip
					title="Password must be 8 characters long and, contain at
							least one number and one special character"
					placement="bottom-start"
					slotProps={{
						popper: {
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, -1],
									},
								},
							],
						},
					}}
				>
					<React.Fragment>
						<LoginInputBox
							inputValue={userPassword}
							changeFunction={setUserPassword}
							inputType={visibility ? "text" : "password"}
							inputID={"password"}
							inputName={"password"}
							inputPlaceholder={"Enter your password"}
							blurFunction={checkPassword}
							refTarget={passwordRef}
							errorBoolean={passwordError}
							errorMessage={passwordErrorMsg}
							focusFunction={removeErrorOnFocus}
						/>
						<div
							className="eye-visibility-icon"
							onClick={() => setVisibility((prev) => !prev)}
						>
							{visibility && <VisibilityIcon />}
							{!visibility && <VisibilityOffIcon />}
						</div>
					</React.Fragment>
				</BootstrapTooltip>
			</div>
		</div>
	);
}
