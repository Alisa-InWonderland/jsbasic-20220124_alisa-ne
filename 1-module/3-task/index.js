function ucFirst(str) {

	if (str.length === 1) {
		return str.toUpperCase();
	}

	else if (!str) {
		return str;
	}

	return str[0].toUpperCase() + str.slice(1);
}
