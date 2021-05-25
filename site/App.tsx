import './_util/rem';
import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import '@src/scss';
import '@jdthfe/eui/compiled/dist/index.css';
import './style/index.scss';

import Instance from './instance';
import Document from './document';

const App = () => {
    return (
        <div className="App height-100">
            <Router>
                <div className="height-100">
                    <Route
                        exact={true}
                        path="/"
                        render={() => <Redirect to="/document" />}
                    />
                    <Route path="/instance" component={Instance as any} />
                    <Route path="/document" component={Document as any} />
                </div>
            </Router>
            {/* <Test /> */}
        </div>
    );
};

export default App;
