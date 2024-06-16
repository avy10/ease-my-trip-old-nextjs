export default function LoginButtons({
  clickFunction,
  buttonText,
  paraText,
  paraFunction,
}) {
  return (
    <div className="login-signup-div">
      <button className="api-call-button" onClick={clickFunction}>
        {buttonText}
      </button>
      <div className="placeholder-login-form"></div>
      <p onClick={paraFunction}>{paraText}</p>{" "}
      {/* <p>
						Not a User ? <button>SignUp</button>{" "}
					</p> */}
    </div>
  );
}
