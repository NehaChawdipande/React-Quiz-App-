import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useHistory } from "react-router";

export default function Quiz() {
  const [questions, setQuestions] = useState([""]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const history = useHistory();
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    fetch("./questions.json")
      .then(function (response) {
        //console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        setQuestions(myJson.questions);
        setisLoading(false);

        // console.log(questions);
      });
  }, []);

  function navigationHandler(state) {
    if (state === "prev") setCurrentQuestion(currentQuestion - 1);
    else setCurrentQuestion(currentQuestion + 1);
  }

  const handleClick = () => {
    history.push("/Result", { answer: answer });
  };
  const optionSelectOnChange = (quesid, userAns, ans) => {
    console.log(quesid, userAns);
    const ansObj = {
      quesid,
      userAns,
      ans,
    };
    setAnswer([...answer, ansObj]);

    if (
      answer.some(function (a) {
        if (a.quesid === ansObj.quesid) return true;
        return false;
      })
    ) {
      //this will check if question has already been answered, if yes then execute the following
      var newAnswers = answer.filter((el) => el.quesid !== quesid);
      setAnswer(newAnswers);
      setAnswer([...newAnswers, ansObj]); //replacing the old answer with new one.
      //console.log(answer); //debugging
    } else {
      setAnswer([...answer, ansObj]); //else it will simply add the answer to the array.
    }
  };

  if (isLoading) return <h1>loading...</h1>;

  return (
    //Main Logic
    <div className="quiz-card">
      <div className="question">
        <h2>
          Question {currentQuestion + 1}. {questions[currentQuestion].question}
        </h2>
      </div>
      <br />
      <hr />
      <br />
      <div className="options">
        <h4>
          <ul>
            {questions[currentQuestion].options.map((opt, key) => {
              return (
                <li key={key + questions[currentQuestion].id + opt}>
                  <input
                    type="radio"
                    name="radioGroup"
                    value={opt}
                    onChange={(e) => {
                      optionSelectOnChange(
                        currentQuestion + 1,
                        e.target.value,
                        questions[currentQuestion].answer
                      );
                    }}
                  />{" "}
                  &nbsp;{opt}
                </li>
              );
            })}
          </ul>
        </h4>
      </div>
      <br />
      <div className="navigation">
        <button
          className="btn btn-success"
          disabled={currentQuestion === 0 ? true : false}
          onClick={() => navigationHandler("prev")}
        >
          <h5>{"<"}</h5>
        </button>
        &nbsp;
        <button
          className="btn btn-warning"
          disabled={currentQuestion === questions.length - 1 ? false : true}
          onClick={handleClick}
        >
          <h5>Submit Quiz</h5>
        </button>
        &nbsp;
        <button
          className="btn btn-success"
          disabled={currentQuestion === questions.length - 1 ? true : false}
          onClick={() => navigationHandler("next")}
        >
          <h5>{">"}</h5>
        </button>
      </div>
    </div>
  );
}
