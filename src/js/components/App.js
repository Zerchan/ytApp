import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import axios from 'Axios';
import _ from 'lodash';

import SearchResults from './searchResults';

const APIkey = 'AIzaSyDHh9YS3c-k9Rzkc5AgaGD4Kl-W_ACJ0oA';

@observer
class App extends Component {
    constructor(){
        super();
        this.makeRequest = _.debounce(this.makeRequest, 500);
    }

    handleSearch(e){
        this.props.route.appState.searchTerm = e.target.value;
        this.makeRequest();
    }

    makeRequest(){
        if(this.props.route.appState.searchTerm != ''){
            const req = axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    type: 'video',
                    key: APIkey,
                    q:  this.props.route.appState.searchTerm
                }
            })
            .then(({ data }) => {
                this.props.route.appState.searchResults = data.items;
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            this.props.route.appState.searchResults = [];
        }
    }

    addVideo(video){
        this.props.route.appState.addToPlaylist(video);
        // .then(() => {
        //     console.log('video added');
        //     if(this.props.route.appState.uncompletedVideos){
        //         this.props.route.appState.playNextVideo(this.props.route.appState.nextVideo);
        //     }
        // });
        this.props.route.appState.searchTerm = '';
        this.props.route.appState.searchResults = [];
    }

    render() {
        const appState = this.props.route.appState;
        const { currentVideo, searchTerm, searchResults } = appState;

        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <div className="search-container">
                                <input type="text" placeholder="Search Video" value={ searchTerm } onChange={ this.handleSearch.bind(this) }></input>
                                { (searchResults.length > 0) ? <SearchResults results={ searchResults } clickHandler={ this.addVideo.bind(this) }/> : null }
                            </div>
                        </div>
                    </div>
                    { this.props.children }
                </div>
            </div>
        );
    }

    changeVideo = () => {
        this.props.route.appState.search();
    }
};

export default App;
