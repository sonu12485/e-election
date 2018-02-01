import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { getSavedToken, deleteToken } from './config';
import 'antd/dist/antd.css';
const authToken = getSavedToken();
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elections: []
            // selectedTable: '',
            // selectedColumns: [],
            // tables: [],
            // columns: [],
            // tableData: [],
            // auth: 'Basic ' + btoa(props.user + ':' + props.pass),
        };

        // this.onTableChange = this.onTableChange.bind(this);
        // this.onColumnChange = this.onColumnChange.bind(this);
        // this.renderTableHeaders = this.renderTableHeaders.bind(this);
        // this.renderTableBody = this.renderTableBody.bind(this);
        // this.getColumnList = this.getColumnList.bind(this);
        // this.getData = this.getData.bind(this);

    }

    componentDidMount()
    {
        axios({
            method: 'post',
            url: 'https://api.artfully11.hasura-app.io/get-elections',
           
            config: { headers: { 'Content-Type': 'application/json' } }
        })
            .then(response => {
                console.log(response.data);




                this.setState({ elections: response.data });
            })
            .catch(error => {
               alert(`Sorry, can't fetch elections right now!`);
               console.log('Post request failed!');
            });
    }


    onLogout = () => {


        console.log('CLicked logout');
        const authToken = getSavedToken();
        if (authToken) {
            deleteToken();
        }
        else {
            alert('Please login at /auth first');
        }

    }

    onClickElection = () => {
        const authToken = getSavedToken();
        if (authToken) {
            deleteToken();
        }
        else {
            alert('Please login at /auth first');
        }

    }

   
//Add Ant.Design components like lists etc. below 
    render() {
        return (
            <div className="App">
                <h1>Welcome to E Election</h1>
                <div>
                    <Button type="primary" href="/get-credentials">Get Credentials</Button>
                    <Button type="primary" onClick={this.onLogout}>Logout</Button>
                </div>
                <div>
                <h1>All Elections</h1>
                    <ol>
                        {this.state.elections.map(function (election) {
                            return (
                                <li key={election.election_id}>
                                
                                <ul>
                               <li key={election.election_id}>
                                 <li key={election.post}>Election Post: {election.post}</li>
                                 <li key={election.state}>Election State: {election.state}</li>
                                <li key={election.election_start_time}>Election Start Time: {election.election_start_time}</li>
                                <li key={election.election_end_time}>Election End Time: {election.election_end_time}</li>
                                <li key={election.nomination_start_time}>Nomination Start Time: {election.nomination_start_time}</li>
                                <li key={election.nomination_end_time}>Nomination End Time: {election.nomination_end_time}</li>
                               </li>
                               </ul>
                                    <Button type="primary" href={`/election/${election.election_id}`}>View Details</Button>
                                <br />
                                <br />
                               </li>
                            );
                        })}
                    </ol>
                </div>
                
            </div>
        );
    }
}

export default Home;
