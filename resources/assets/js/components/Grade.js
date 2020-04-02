import React, { Component } from 'react'; 
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
class Grade extends Component {
    constructor(props){
        super(props);
        this.noGrade = "NONE";
        this.alt = 'click to edit student grade';
        this.state = {
            inputOpen : false,
            gradeObject:props.config,
            inputValue : {min:0 , max:100}
        }
    }

    componentDidMount(){
    }
    showInput(){
        this.setState({
            inputOpen : true
        });
    }

    handleInput(event){
        if(event.target.value >= 0 && event.target.value <= 100){
            this.setState({
                gradeObject :{...this.state.gradeObject, grade: event.target.value.replace(/\D/,'') // allow only numbers no characters 
                } 
            });
        }
    }

    focusOut(event){
        this.setState({
            inputOpen : false
        });
        if(this.state.gradeObject.grade !== Number(event.target.value) ){
            if(this.state.gradeObject.id){
                axios.patch(`/api/grades/${this.state.gradeObject.id}`,this.state.gradeObject)
                    .then(data=>{
                    this.props.callback('success');
                    })
                    .catch(e=>{
                        this.props.callback('fail');
                    });
            }else{
                axios.post(`/api/grades`,this.state.gradeObject)
                    .then(data=>{
                        this.props.callback('success');
                    })
                    .catch(e=>{
                        this.props.callback('fail');
                    });
            }
        }
    }

    render () {
        return (
            <span className="grade-wrapper" title={this.alt} onClick={(event)=>{this.showInput()}}>
                <div className="class-name">{this.props.config.class_name}</div>
               
                {!this.state.inputOpen? 
                    <div className="class-grade">
                         <span className="icon"><FontAwesomeIcon icon={faPencilAlt}/></span>
                        <span>{this.state.gradeObject.grade ||  this.noGrade}</span>
                       
                    </div>
                    :
                    <input type="text" className="form-control grade-input" autoFocus value={this.state.gradeObject.grade || ''} onChange={e=>this.handleInput(e)} onBlur={e=>this.focusOut(e)}/>
                }  
                
        </span>
        )
    }
}
export default Grade;