import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(){
   
    return(
        <div className="card">
            <h1>Welcome to Dummy Quiz!</h1>
            <br/>
            <Link to="/Quiz"><button className="btn btn-success">Start Quiz!</button></Link>

        </div>
        
        
    );
}