import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Playlist extends Component {
    constructor(){
        super();
    }

    // removeVideo(id){
    //     this.props.removeVideo(id);
    // }

    renderList(items){
        if(items.length > 0){
            return items.map( (item, index) => {
                const classes = (index === 0)?'media current':'media';
                return (
                    <li key={ item.videoId } className={ classes }>
                        <figure className="media-left">
                                <img src={ item.thumbnail } />
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{ item.title }</strong>
                                    <br />
                                    <small>{ item.channel }</small>
                                    <br />
                                    { (this.props.deleteButton) ? <small><span onClick={ () => { this.props.removeVideo(item) } } className="delete-btn">Delete</span></small> : null }
                                </p>
                            </div>
                        </div>
                    </li>
                );
            });
        }

        return (
            <li>There is no videos at the playlist in this moment...</li>
        );

    }

    render() {
        return (
            <ul>
                { this.renderList(this.props.listItems) }
            </ul>
        );
    }
};

export default Playlist;
