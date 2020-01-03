const tweetsInfo = require('../models/tweetsInfo');
const topOccurrences = require('../models/topOccurrences');
const moment = require('moment');

const handle = (startTime) => ({
    stats: {

        topValues: {
            topWords: topOccurrences.topWords,
            topHastags: topOccurrences.topHashTags,
            topUsers: topOccurrences.topUsers,
        },
        tweetsPerSecond: getTweetsPerSecond(startTime, tweetsInfo.totalTweets)
    }
});

const getTweetsPerSecond = (startTime, totalTweets) => {
    const startTimeAsMoment = moment(startTime);
    const totalSeconds = moment().diff(startTimeAsMoment, 'seconds');
    const result =  totalTweets / totalSeconds;
    return (Math.round(result * 100) / 100).toFixed(2);
};

Object.assign(module.exports,
    { handle }
);
