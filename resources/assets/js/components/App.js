import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StudentList from './StudentList';
import Student from './Student';
import Login from './Login';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
                isLoggedIn : false,
                role:"guest",
                id:null,
                page:'/login'
            },
            isLoggedIn:false
        }
    }

    render () {
        return (
            <Router>
                <div className="container">
                    <Header/>
                        <div className="content" style={{paddingTop:5 + 'rem', fontSize : 25 +'px'}}>
                            <Switch>
                                <Route path="/users/:id" render={(props)=><Student config={this.state.user} />} />
                                <Route path="/users" component={StudentList} config={this.state.user}/>
                                <Route path={["/","login"]} render={(props)=><Login /> }/>
                            </Switch>
                        </div>
                    <Footer />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));