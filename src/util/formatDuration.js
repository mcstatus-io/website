export default (duration) => {
	if (duration < 1000) {
		return Math.trunc(duration) + 'ms';
	} else if (duration < 1000 * 60) {
		const value = Math.trunc(duration / 1000);

		return value + ' second' + (value !== 1 ? 's' : '');
	} else if (duration < 1000 * 60 * 60) {
		const value = Math.trunc(duration / (1000 * 60));

		return value + ' minute' + (value !== 1 ? 's' : '');
	} else if (duration < 1000 * 60 * 60 * 24) {
		const value = Math.trunc(duration / (1000 * 60 * 60));

		return value + ' hour' + (value !== 1 ? 's' : '');
	}

	const value = Math.trunc(duration / (1000 * 60 * 60 * 24));

	return value + ' day' + (value !== 1 ? 's' : '');
};