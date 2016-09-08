const YtVideo = require('./../models/video.model');

// Route Handlers
const routeHandlers = {
    addVideo: (videoData) => {
        const video = new YtVideo(videoData);
        return video.save();
    },
    findAllVideos: () => {
        return YtVideo.find({});
    },
    deleteVideo: (data) => {
        return YtVideo.remove({ videoId: data.id });
    },
    deleteAllVideos: () => {
        YtVideo.remove({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err.errmsg);
        })
    }
}

module.exports = routeHandlers;
