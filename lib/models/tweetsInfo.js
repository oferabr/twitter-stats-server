class TweetsInfo {

	constructor(){
		this._words = {};
		this._hashTags = {};
		this._users = {};
		this._totalTweets = 0;
	}


    get totalTweets() {
        return this._totalTweets;
    }

    set totalTweets(value) {
        this._totalTweets = value;
    }

    get words() {
		return this._words;
	}

	set words(value) {
		this._words = value;
	}

	get hashTags() {
		return this._hashTags;
	}

	set hashTags(value) {
		this._hashTags = value;
	}

	get users() {
		return this._users;
	}

	set users(value) {
		this._users = value;
	}
}

module.exports = new TweetsInfo();