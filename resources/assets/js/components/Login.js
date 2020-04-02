import React from 'react';
import axios from 'axios';
import StudentList from './StudentList';
import Student from './Student';
import { Redirect } from 'react-router';
export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChnageHandler = this.onChnageHandler.bind(this);
        this.state = {
            user:{
                isAuthenticated : false ,
                role:'guest',
                id:null
            },
            
            formControls : {
                email: '',
                password : ''
            }
        }
    }

    componentDidUpdate(props , old_props){
        
    }

    onChnageHandler(event){
        let controlName = event.target.name;
        let formControls = {...this.state.formControls};
        formControls[controlName] = event.target.value;
        this.setState({formControls:formControls});
    }

    handleSubmit(event){
        let userObject = {
            email:this.state.formControls.email , 
            password : this.state.formControls.password
        }
        axios.post(`/api/login` ,userObject )
            .then(res=>{
                // this.props.callback({
                //             role:res.data.role,
                //             id:res.data.id,
                //             isAuthenticated : true
                //         })
                if(res.data.success === true){
                    this.setState({
                        user:{
                            role:res.data.role,
                            id:res.data.id,
                            isAuthenticated : true
                        }
                    });
                   this.setLocalStorage();
                } 
            })
        event.preventDefault();
    }

    setLocalStorage(){
        let path;
        switch(this.state.user.role){
            case "admin":
                path = '/users';
                break;
            case "student":
                path=`/users/${this.state.user.id}`;
                break;
            case "guest":
                default :
                path='/login';
                break;
        }
        let storageObject = JSON.stringify({...this.state.user , path:path});
        localStorage.setItem("user",storageObject);
    }
    render(){
        return (
            <section>
                { !this.state.user.isAuthenticated && this.state.user.role === 'guest' ? 
                <div className="form-container"> 
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <h2>Login</h2>
                        <div className="form-group flex">
                            <label htmlFor="email">Email:</label>
                        <   input type="text" className="form-control" name="email" value={this.state.formControls.email} onChange={this.onChnageHandler} placeholder="Email"/>
                        </div>
                        <div className="form-group flex">
                            <label htmlFor="password"> Password:</label>
                            <input type="text" className="form-control" name="password" value={this.state.formControls.password} onChange={this.onChnageHandler} placeholder="Password"/>
                        </div>
                        <button className="btn btn-primary" type="submit">Send</button>
                    </form>
                </div>
                :
                <div>
                    {this.state.user.role === "admin" ?  <Redirect to={{pathname:'/users', user:this.state.user}}/>: null}
                    {this.state.user.role === "student"? <Redirect to={{pathname:`/users/${this.state.user.id}`, user:this.state.user}}/> : null}
                </div>    
                
                }
            </section>
            
            
        )
    }
}