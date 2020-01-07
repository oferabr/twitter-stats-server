const { isEmpty } = require('lodash');
const WordInfo = require('../models/wordInfo');
const tweetsInfo = require('../models/tweetsInfo');
const topOccurrences = require('../models/topOccurrences');
const { get, split, forEach, some, findIndex, map, filter } = require('lodash');
const { WORDS_TO_IGNORE, MAX_ARRAY_SIZE, WORD_COUNT_FIELD, USER_COUNT_FIELD, HASHTAG_COUNT_FIELD }  = require('./consts');

const handle = tweetInfo => {

	if (isEmpty(get(tweetInfo, 'user.screen_name', ''))) return;
	const { words, user, hashTags } = getRequiredFields(tweetInfo);
	updateTweetsInfo({ words, user, hashTags });
	updateArrayWithTopValues({
		array: topOccurrences.topUsers,
		value: user,
		occurrences: get(tweetsInfo, `wordsMap[${user}].${USER_COUNT_FIELD}`)
	});
	forEach(words, word => updateArrayWithTopValues({
		array: topOccurrences.topWords,
		value: word,
		occurrences: get(tweetsInfo, `wordsMap[${word}].${WORD_COUNT_FIELD}`)
	}));
	forEach(hashTags, hashTag => updateArrayWithTopValues({
		array: topOccurrences.topHashTags,
		value: hashTag,
		occurrences: get(tweetsInfo, `wordsMap[${hashTag}].${HASHTAG_COUNT_FIELD}`)
	}));
};

const updateTweetsInfo = ({ words, user, hashTags }) => {

	updateTweetsCount();
	UpdateInfo({ filedName: USER_COUNT_FIELD, key: user });
	map(words, word => UpdateInfo({ filedName: WORD_COUNT_FIELD, key: word }));
	map(hashTags, hashTag => UpdateInfo({ filedName: HASHTAG_COUNT_FIELD, key: hashTag }));

};
const UpdateInfo = ({ key, filedName }) => {
	const wordsMap = tweetsInfo.wordsMap;
	if (!get(wordsMap, `${key}`)) {
		createNewWordInfo({ key, filedName, wordsMap });
	}
	else {
		updateExistingWord({ key, filedName, wordsMap });
	}
};

const updateTweetsCount = () => tweetsInfo.totalTweets += 1;

const createNewWordInfo = ({ key, filedName, wordsMap }) => {
	wordsMap[key] = new WordInfo({ [filedName]: 1 });
};

const updateExistingWord = ({ key, filedName, wordsMap }) => {
	const wordInfo = get(wordsMap, `${key}`);
	wordInfo[filedName] = wordInfo[filedName] + 1;

};


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
	user: get(tweetInfo, 'user.screen_name', '').toLowerCase(),
	hashTags: map(get(tweetInfo, 'entities.hashtags'), item => item.text.toLowerCase()),
	words: filter(split(get(tweetInfo, 'text', '').toLowerCase(), ' '), word => !WORDS_TO_IGNORE.has(word))
});



Object.assign(module.exports, {
	handle
});