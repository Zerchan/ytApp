const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ytVideoSchema = new Schema({
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    thumbnail: String,
    channel: String,
    isDone: { type: Boolean, required: true }
});

const YtVideo = mongoose.model('YtVideo', ytVideoSchema);

module.exports = YtVideo;
