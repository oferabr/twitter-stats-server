const consts = {
	WORDS_TO_IGNORE: new Set(['rt', 'for', 'to', 'a', 'the', 'and', 'is', 'are', 'in', 'of', '', 'this', 'that', 'i', ',', '.']),
	MAX_ARRAY_SIZE: 10,
	WORD_COUNT_FIELD: 'wordCount',
	USER_COUNT_FIELD: 'userCount',
	HASHTAG_COUNT_FIELD: 'hashTagCount'
};

Object.assign(module.exports, {
	...consts
});