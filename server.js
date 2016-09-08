const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const routeHandlers = require('./server/routes');
const port = 8000;

mongoose.connect('mongodb://localhost:27017/ytVideosDB');
mongoose.Promise = global.Promise;

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/deleteAllVideos', routeHandlers.deleteAllVideos);

function allVideos(socket){
    routeHandlers.findAllVideos()
        .then((data) => {
            socket.emit('all-videos', data);
        })
        .catch((err) => {
            console.log(err.errmsg);
        })
}

io.on('connection', (socket) => {
    allVideos(socket);

    socket.on('get-all-videos', () => {
        allVideos(socket);
    });

    socket.on('add-video', (video) => {
        routeHandlers.addVideo(video)
            .then((data) => {
                io.emit('video-saved', data);
            })
            .catch((err) => {
                console.log(err.errmsg);
            })
    });

    socket.on('delete-video', (videoData) => {
        routeHandlers.deleteVideo(videoData)
            .then((data) => {
                io.emit('video-deleted', data);
            })
            .catch((err) => {
                console.log(err.errmsg);
            })
    });

    socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
