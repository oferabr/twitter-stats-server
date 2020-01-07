
class TweetsInfo {

	constructor() {
		this._wordsMap = {};
		this._totalTweets = 0;

	}

	get totalTweets() {
		return this._totalTweets;
	}

	set totalTweets(value) {
		this._totalTweets = value;
	}

	get wordsMap() {
		return this._wordsMap;
	}

	set wordsMap(value) {
		this._wordsMap = value;
	}
}

module.exports = new TweetsInfo();