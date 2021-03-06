import React, { Component } from 'react'; 
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import LocalStorageService from '../services/LocalStorage.service';
import ApiHelperService from '../services/ApiHelper.service';
class Student extends Component {
    constructor(props){
        super(props);
        this.noGrade = 'NONE'
        this.allowedUsers = ['admin' , "student"];
        this.state = {
            studentId :props.userId || '',
            student:{},
            classes:[],
            user:{...props.location.user}
        }
        
    }
    
    componentDidMount(){
        let user = LocalStorageService.getLocalStorage();
        if(_.includes(this.allowedUsers, user.role || this.state.user.role)){
            if(this.state.user.id){
                ApiHelperService.setAxiosHeaders(this.state.user.api_token);
                this.getUser(this.state.user.id);
            }else{
                const { match: { params } } = this.props;
                ApiHelperService.setAxiosHeaders(user.api_token);
                if(user.role === "admin"){
                    this.getUser(params.id);
                }else{
                    this.getUser(user.id || params.id);
                }
                if(user.id && user.role !== "admin"){
                    this.props.history.push(`/users/${user.id}`)
                }
                
            }
            this.getClasses()
        }
    }

    getUser(id){
        axios.get(`/api/users/${id}`)
        .then(res=>{
            this.setState({
                student:res.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    getClasses(){
        axios.get(`/api/classes`)
        .then(res=>{
            this.setState({
                classes:res.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    checkForGrades(classItem){
        let index = _.findIndex(this.state.student.grades,el=>{
            return el.class_id == classItem.id
        });
        return index !== -1? this.state.student.grades[index].grade : this.noGrade
    }

    render () {
        return (
            _.includes(this.allowedUsers,LocalStorageService.getLocalStorage().role || this.state.user.role) ? 
            <div className="student-container">
                <div>{this.state.student.name}</div> 
                <div>{this.state.student.email}</div> 
                <ul className="list-group">
                    {
                        this.state.student.grades && this.state.classes.length ? 
                           this.state.classes.map(item=>{
                                return (
                                    <li className="list-group-item flex justify-content" key={item.id}>
                                        <div>{item.class_name}</div>  <div>{this.checkForGrades(item) || this.noGrade}</div>
                                    </li>
                                )
                        })
                        : 
                        null
                    }               
                </ul>
            </div>
            :
            <Redirect to="/login" />
        )
    }
}
export default withRouter(Student);