import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';

const App = () => {
    return (
        <Router>
            <Fragment>
                <h3>Socialize - social network</h3>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/login'>Sign In</Link></li>
                    <li><Link to='/register'>Sign Up</Link></li>
                </ul>
                <section>
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/register' component={Registration} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
};

export default App;
