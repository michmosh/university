import React, { Component } from 'react'; 
import axios from 'axios';
import {Link , withRouter, Redirect} from 'react-router-dom';
import Grade from './Grade';
import LocalStorageService from '../services/LocalStorage.service';

class StudentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            students :[],
            classes:[],
            alertStatus:'',
            user:{...props.location.user}
        }
        this.noGrade = "NONE";
        this.alt = 'click to edit student grade';
    }

    componentDidMount(){
        let user = LocalStorageService.getLocalStorage();
        if(this.state.user.role === "admin"|| user.role=== "admin"){
            this.getUsers();
            this.getClasses();
        }
    }
   
    getUsers(){
        axios.get('/api/users')
        .then(res=>{
            this.setState({
                students:res.data
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
    checkForGrades(student,classItem){
        let index;
        let emptyGradeObject = {class_name:classItem.class_name,class_id:classItem.id,student_id:student.id,grade:''};
        index = _.findIndex(student.grades , element => {
            return element.class_id == classItem.id
        });

        return index !== -1 ? student.grades[index] : emptyGradeObject
       
    }

    showAlert(status){
        this.setState({
            alertStatus:status
        });
        setTimeout(()=>{
            this.setState({
                alertStatus:''
            });
        },1000); 
    }
    render () {
        return (
            this.state.user.role === "admin" || LocalStorageService.getLocalStorage().role === "admin" ?
            <div className="students-wrapper">
                <table className="table table-hover table-bordered">
                    <tbody>
                    {this.state.students.length && this.state.classes.length ?
                    this.state.students.map((el,index)=>{
                        return(
                            <tr  key={el.id}>
                                <td className="student-name" >
                                    <Link to={`/users/${el.id}`}>{el.name}</Link>
                                </td>
                                <td className="class-wrapper">
                                    {
                                        this.state.students.length && this.state.classes.length ?
                                        this.state.classes.map(item=>{
                                            return (
                                                <Grade config={this.checkForGrades(el,item)} key={item.id} callback={(status)=>this.showAlert(status)} />
                                            )
                                        })
                                        :
                                        null
                                    }
                                </td>
                            </tr>
                        )
                    }) :
                    null
                    }
                    </tbody>
                </table>
                <div className={"alert " + this.state.alertStatus}>{this.state.alertStatus}</div>
            </div>
            :
            <Redirect to="/login" />
        )
    }
}
export default StudentList;