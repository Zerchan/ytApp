import React, { Component } from 'react';
import { observer } from 'mobx-react';
import YouTube from 'react-youtube';
import Playlist from './playlist';

@observer
class Player extends Component {
    constructor(){
        super();
    }

    nextVideo() {
        const state = this.props.routes[0].appState;
        let cVideo = state.currentVideo;

        if(cVideo){
            state.completeVideo(cVideo);
        }

        state.playNextVideo(state.nextVideo);
    }

    removeVideo(video){
        //console.log('Remove: ', video.videoId);
        this.props.routes[0].appState.completeVideo(video);
    }

    render() {
        const appState = this.props.routes[0].appState;
        const { currentVideo } = appState;
        let showVideo = (currentVideo && appState.uncompletedVideos.length > 0);

        return (
            <div className="columns">
                <section className="column is-7 video-container">
                    <div className="video-wrapper">
                        { (showVideo) ? <h1 className="title">{ currentVideo.title }</h1> : null }
                        { (showVideo) ? <h3 className="subtitle">{ currentVideo.channel }</h3> : null }
                        {
                            (showVideo) ?
                            // <YouTube
                            //     videoId={ currentVideo.videoId }
                            //     onEnd={ this.nextVideo.bind(this) }
                            //     opts = { { width: '100%', playerVars: { autoplay: 1, origin: 'www.youtube.com' } } }
                            // />
                            <iframe width="100%" height="360" src={`https://www.youtube.com/embed/${currentVideo.videoId}`} frameborder="0" autoplay="1" allowfullscreen></iframe> :
                            <p>No video selected</p>
                        }
                    </div>
                </section>
                <section className="column is-5 playlist">
                    <Playlist deleteButton={ true } listItems={ appState.uncompletedVideos } removeVideo={ this.removeVideo.bind(this) } />
                </section>
            </div>
        );
    }
};

export default Player;
