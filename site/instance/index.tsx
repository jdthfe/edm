import { Route, Link, RouteComponentProps } from 'react-router-dom';
import React from 'react';
import { componentIndex, sortComponentIndex } from '../_util';
import Home from './Home';
import Demo from './Demo';
const Mobile: React.FC<RouteComponentProps> = (props) => {
    const { match } = props;
    return (
        <div className="instance">
            <nav className="instance-nav">
                <Link className="instance-nav-link" to="/instance">
                    HOME{' '}
                </Link>
                | {(location.href.split('/').pop() || '').toUpperCase()}
            </nav>
            {match.isExact ? (
                <Home structure={sortComponentIndex(componentIndex)} />
            ) : null}

            {componentIndex.map((item) => (
                <Route
                    key={item.name}
                    path={`/instance/${item.name}`}
                    component={() => <Demo item={item} />}
                />
            ))}
        </div>
    );
};

export default Mobile;
