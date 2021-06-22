import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import common from './constant/common';
import { LoadingFallback } from './components/LoadingFallback';
import socketIOClient from 'socket.io-client';
const ENDPOINT = common.socket_base_url;

/** LazyLoad-Pages */
const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./page'));
const Game = lazy(() => import('./page/game'));

const App = () => {
    const socket = socketIOClient(
        ENDPOINT,
        { transports: ['websocket'] },
        { withCredentials: true },
    );
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Router>
                <Switch>
                    <Header>
                        <Redirect to="/home" from="/" />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/game">
                            <Game socket={socket} />
                        </Route>
                    </Header>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default App;
