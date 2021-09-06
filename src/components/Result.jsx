import React from 'react';
import { Link } from 'react-router-dom';
export default function Result(props)
{
  let ans = props.location.state;
   let score =0;
    return(
        
        <div className="result-card">
            {/* {console.log(ans.answer)} //for debugging*/} 
           {
             ans.answer.forEach(element => {
                 if(element.userAns === element.ans)
                    score=score+1;
             })
             
           }
           
           
            <h1 className={score===4?"title-success":"title-warning"}>{score===4?"Excellent!": "You can do better!"}</h1><h2>You have scored : {score}/{ans.answer.length} !</h2>
            <br/>
            <h6>Here is a summary: </h6> <hr/>
            <table>
                <thead>
                <tr>
                    <th>Question No.</th>
                    <th>Expected Answer</th>
                    <th>Your Answer</th>
                </tr>
                </thead>
                <tbody>
            {ans.answer.map((a,key)=>{
                return <tr key={key}className={a.ans!==a.userAns?"title-danger":"title-success"}><td>{a.quesid}.</td><td>{a.ans}</td><td>{a.userAns}</td></tr>
            })}
            </tbody>
            </table>
            <hr/>
            <Link to="/Home">
            <button className="btn btn-success">Restart Quiz.</button>
            </Link>
        </div>
    );
}