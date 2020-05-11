import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <Fragment>
                <h3>Socialize - social network</h3>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/login'>Sign In</Link></li>
                    <li><Link to='/register'>Sign Up</Link></li>
                    <li><Link to='/logout'>Log Out</Link></li>
                </ul>
                <section>
                    <Switch>
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Registration} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
};

export default App;
