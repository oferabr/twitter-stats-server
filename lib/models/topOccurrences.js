
class TopOccurrences {

	constructor() {
		this._topWords = [];
		this._topHashTags = [];
		this._topUsers = [];
	}

	get topUsers() {
		return this._topUsers;
	}

	set topUsers(value) {
		this._topUsers = value;
	}

	get topWords() {
		return this._topWords;
	}

	set topWords(value) {
		this._topWords = value;
	}

	get topHashTags() {
		return this._topHashTags;
	}

	set topHashTags(value) {
		this._topHashTags = value;
	}

}
module.exports = new TopOccurrences();