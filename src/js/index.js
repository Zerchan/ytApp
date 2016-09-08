import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link , hashHistory } from 'react-router';
import AppState from './AppState';
import App from './components/App';

import Player from './components/player';
import List from './components/list';

const appState = new AppState();

render(
    <Router history={ hashHistory }>
        <Route path="/" component={ App } appState={ appState }>
            <IndexRoute component={ List } />
            <Route path="/player" component={ Player } />
        </Route>
    </Router>,
  document.getElementById('ytApp')
);
