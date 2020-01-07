class WordInfo {

	constructor({wordCount = 0, hashTagCount = 0, userCount = 0}) {

		this._wordCount = wordCount;
		this._hashTagCount = hashTagCount;
		this._userCount = userCount;
	}


	get wordCount() {
		return this._wordCount;
	}

	set wordCount(value) {
		this._wordCount = value;
	}

	get hashTagCount() {
		return this._hashTagCount;
	}

	set hashTagCount(value) {
		this._hashTagCount = value;
	}

	get userCount() {
		return this._userCount;
	}

	set userCount(value) {
		this._userCount = value;
	}
}

module.exports  = WordInfo;