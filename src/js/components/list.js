import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Playlist from './playlist';

@observer
class List extends Component {
    constructor(){
        super();
    }

    render() {
        const appState = this.props.routes[0].appState;

        return (
            <div className="columns">
                <section className="column is-12 playlist">
                    <Playlist deleteButton={ false } listItems={ appState.uncompletedVideos } />
                </section>
            </div>
        );
    }
};

export default List;
