export function getRandomNumber(min, max, decimalPlaces) {
	// const min = 3.5;
	// const max = 5.0;
	const num = Math.random() * (max - min) + min;
	const numFixed = num.toFixed(decimalPlaces);
	// const numRounded = Math.round(numFixed);

	return numFixed;
}
