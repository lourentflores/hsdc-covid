import React, { Component } from 'react';
import styles from '../styles/styles.css';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
    }


    // Build out a get request for the current user logged in to the Db to get all previous scores
getProfile(){
 fetch('/profile', {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' },
     
 })


}
    render() {
        return (
            <div>
                <p>Hello World</p>
            </div>
        );
    }

}

export default ProfilePage;