import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGraduationCap} from "@fortawesome/free-solid-svg-icons";
class Header extends Component {
    render () {
        return (
        <div className="header">
            <span className="icon">
                <FontAwesomeIcon icon={faGraduationCap}/>
            </span>
        </div>
        )
    }
}
export default Header;