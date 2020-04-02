import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Redirect} from 'react-router';
import Header from './Header';
import Footer from './Footer';
import StudentList from './StudentList';
import Student from './Student';
import Example from './Example';
import Login from './Login';

class App extends Component {
    constructor(props , history){
        super(props);
        this.state = {
            isLoggedIn : false,
            role:"guest",
            id:null
        }
    }
    render () {
        return (
            <Router>
                <div className="container">
                    <Header />
                        <div className="content" style={{paddingTop:5 + 'rem', fontSize : 25 +'px'}}>
                            <Switch>
                                <Route path="/users/:id" render={(props)=><Student userId="3"/>} />
                                <Route path="/users" component={StudentList} config={this.state}/>
                                <Route path={["/","login"]} render={(props)=><Login/> }/>
                            </Switch>
                        </div>
                    <Footer />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));