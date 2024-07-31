import styles from "./LoginButtons.module.css";
export default function LoginButtons({
	clickFunction,
	buttonText,
	paraText,
	paraFunction,
}) {
	return (
		<div className={styles.loginSignupDiv}>
			<button className={styles.apiCallButton} onClick={clickFunction}>
				{buttonText}
			</button>
			<div className={styles.placeholderLoginForm}></div>
			<p onClick={paraFunction}>{paraText}</p>{" "}
			{/* <p>
						Not a User ? <button>SignUp</button>{" "}
					</p> */}
		</div>
	);
}
