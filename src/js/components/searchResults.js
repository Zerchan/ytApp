import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class SearchResults extends Component {
    constructor(){
        super();
    }

    renderList(items){
        return items.map(
            (item) => <li key={ item.id.videoId } onClick={ () =>{ this.props.clickHandler(item) } }>{ item.snippet.title }</li>
        );
    }

    render() {
        return (
            <ul className="search-results">
                { this.renderList(this.props.results) }
            </ul>
        );
    }
};

export default SearchResults;
