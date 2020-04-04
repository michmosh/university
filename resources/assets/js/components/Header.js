import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import LocalStorageService from '../services/LocalStorage.service';
import ApiHelperService from '../services/ApiHelper.service';
class Header extends Component {
    constructor(props){
        super(props);
    }

    logout(event){
        LocalStorageService.removeLocalStorage();
        ApiHelperService.removeAxiosHeader();
        this.props.history.push('/login');
    }
    render () {
        return (
        <div className="header flex">
            <span className="icon">
                <FontAwesomeIcon icon={faGraduationCap}/>
            </span>
            {
                this.props.location.pathname !== "/login" ? 
                <span className="icon" onClick={(event)=>this.logout(event)}>logout</span>
                :
                null
            }
        </div>
        )
    }
}
export default withRouter(Header);