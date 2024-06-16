export default function LoginInputBox({
	inputValue,
	changeFunction,
	inputType,
	inputID,
	inputName,
	inputPlaceholder,
	blurFunction,
	refTarget,
	errorBoolean,
	errorMessage,
	setEmailError,
	focusFunction,
}) {
	return (
		<>
			<input
				value={inputValue}
				onChange={(e) => changeFunction(e.target.value)}
				type={inputType}
				id={inputID}
				name={inputName}
				placeholder={inputPlaceholder}
				onBlur={blurFunction}
				ref={refTarget}
				onFocus={() => focusFunction(inputType)}
			/>
			<p className="login-signup-error-p-tag">
				{errorBoolean ? errorMessage : <>&nbsp;</>}
			</p>
			{/* {errorBoolean && (
				<p className="login-signup-error-p-tag">{errorMessage}</p>
			)} */}
		</>
	);
}
