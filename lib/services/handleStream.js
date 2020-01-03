const tweetsInfo = require('../models/tweetsInfo');
const { isEmpty } = require('lodash');
const topOccurrences = require('../models/topOccurrences');
const { get, split, forEach, some, findIndex, map, filter } = require('lodash');

const wordsToIgnore = new Set(['rt', 'for', 'to', 'a', 'the', 'and', 'is', 'are', 'in', 'of', '', 'this', 'that', 'i']);
const MAX_ARRAY_SIZE = 10;

const handle = tweetInfo => {

	if(isEmpty(get(tweetInfo, 'user.screen_name',''))) return;
	const { words, user, hashTags } = getRequiredFields(tweetInfo);
	updateTweetsInfo({ words, user, hashTags });
	updateArrayWithTopValues({ array: topOccurrences.topUsers, value: user, occurrences: tweetsInfo.users[user] });
	forEach(words, word => updateArrayWithTopValues({
		array: topOccurrences.topWords,
		value: word,
		occurrences: tweetsInfo.words[word]
	}));
	forEach(hashTags, hashTag => updateArrayWithTopValues({
		array: topOccurrences.topHashTags,
		value: hashTag,
		occurrences: tweetsInfo.hashTags[hashTag]
	}));
};

const updateTweetsInfo = ({ words, user, hashTags }) => {

    updateTweetsCount();
	UpdateInfo({ OccurrencesMap: tweetsInfo.users, key: user });
	map(words, word => UpdateInfo({ OccurrencesMap: tweetsInfo.words, key: word }));
	map(hashTags, hashTag => UpdateInfo({ OccurrencesMap: tweetsInfo.hashTags, key: hashTag }));

};
const updateTweetsCount = () => tweetsInfo.totalTweets+=1;

const UpdateInfo = ({ OccurrencesMap, key }) => {
	return OccurrencesMap[key] = get(OccurrencesMap, `${key}`, 0) + 1};

const updateArrayWithTopValues = ({ array, value, occurrences }) => {
	if (!some(array, item => item.value === value) && array.length < MAX_ARRAY_SIZE) {
		array.push({
			value,
			occurrences
		});
	}
	else {

		let replacePosition = findIndex(array, item => item.value === value);
		replacePosition === -1 && forEach(array, (item, index) => {
			if (get(item, 'occurrences') < occurrences) {
				replacePosition = index;
				return false;
			}
		});
		if (replacePosition !== -1) array[replacePosition] = { value, occurrences };
	}
};

const getRequiredFields = tweetInfo => ({
	user: get(tweetInfo, 'user.screen_name','').toLowerCase(),
	hashTags: map(get(tweetInfo, 'entities.hashtags'), item => item.text.toLowerCase()),
	words: filter(split(get(tweetInfo, 'text', '').toLowerCase(), ' '), word => !wordsToIgnore.has(word))
});


Object.assign(module.exports, {
	handle
});