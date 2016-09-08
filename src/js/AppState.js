import { observable, computed } from 'mobx';
import axios from 'Axios';
import io from 'socket.io-client';

const socket = io();

class YtVideo {
    @observable isDone = false;
    @observable videoId;
    @observable title;
    @observable thumbnail;
    @observable channel;

    constructor(video){
        this.videoId = video.videoId;
        this.title = video.title;
        this.thumbnail = video.thumbnail;
        this.channel = video.channel;
    }
}

class AppState {
    @observable currentVideo = '';
    @observable searchTerm = '';
    @observable searchResults = [];
    @observable playlist = [];

    @computed get uncompletedVideos(){
        return this.filterUndoneVideos();
    }

    @computed get nextVideo(){
        return this.filterUndoneVideos()[0];
    }

    constructor(){
        //this.loadAllVideos();

        socket.on('all-videos', (data) => {
            //console.log('client-side - all videos');
            this.loadAllVideos(data);
        });

        socket.on('video-saved', (data) => {
            //console.log('client-side - video saved');
            const ytvideo = new YtVideo(data);
            this.playlist.push(ytvideo);

            if(this.playlist.length === 1){
                this.playNextVideo(ytvideo);
            }
        });

        socket.on('video-deleted', () => {
            //console.log('client-side - video deleted');
            socket.emit('get-all-videos', {});
        });
    }

    loadAllVideos(data){
        // axios.get('/allVideos')
        // .then((response) => {
        //     if(response.data.length > 0){
        //         this.playlist = response.data;
        //         this.playNextVideo(response.data[0]);
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        if(data.length > 0){
            this.playlist = data;
            this.playNextVideo(data[0]);
        }else{
            this.playlist = [];
        }
    }

    playNextVideo(video){
        if(this.playlist.length > 0){
            this.currentVideo = video;
        }else{
            this.currentVideo = '';
        }
    }

    addToPlaylist(video){
        //console.log(video);
        socket.emit('add-video', {
            videoId: video.id.videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url,
            channel: video.snippet.channelTitle,
            isDone: false
        })

        // return axios.get('/addVideo', {
        //     params: {
        //         videoId: video.id.videoId,
        //         title: video.snippet.title,
        //         thumbnail: video.snippet.thumbnails.medium.url,
        //         channel: video.snippet.channelTitle,
        //         isDone: false
        //     }
        // })
        // .then((response) => {
        //     //console.log(response);
        //     this.playlist.push(new YtVideo(response.data));
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    // removeVideo(videoId){
    //     console.log('DELETE', videoId);
    //     this.playlist = this.playlist.filter((video) => {
    //         return video.videoId !== videoId;
    //     });
    // }

    filterUndoneVideos(){
        return this.playlist.filter((video) => {
            return video.isDone === false;
        });
    }

    completeVideo(video){
        video.isDone = true;
        //console.log('Send video deleted event');
        socket.emit('delete-video', { id: video.videoId});
        // axios.get(`/deleteVideo/${video.videoId}`)
        //     .then((item) => {
        //         console.log('Video deleted');
        //         console.log(item);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }
}

export default AppState;
