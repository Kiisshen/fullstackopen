import { useState, useEffect } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </>
  )
}

const Statistics = (props) => {
  if(props.a === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  else{
    return(
      <>
        <table>
          <StatisticsLine text={"good"} value={props.g} />
          <StatisticsLine text={"neutral"} value={props.n} />
          <StatisticsLine text={"bad"} value={props.b} />
          <StatisticsLine text={"all"} value={props.a} />
          <tbody>
            <tr>
              <td>average</td>
              <td>{Math.round(props.avg(props.g, props.n, props.b) * 10) / 10}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{Math.round(props.posPort(props.g, props.n, props.b) * 1000) / 10} %</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
}

const Button = ({ text, clickHandler }) => {
  return (
    <>
      <button onClick={clickHandler}>{text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  useEffect(() => {
    setAll(good + neutral + bad)
  }, [good, neutral, bad])

  const calculateAvg = (good, neutral, bad) => {
    return (good * 1 + bad * -1)/(good + neutral + bad)
  }
  const positivePortion = (good, neutral, bad) => {
    return good/(good + neutral + bad)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button text={"good"} clickHandler={() => setGood(good + 1)}/>
        <Button text={"neutral"} clickHandler={() => setNeutral(neutral + 1)}/>
        <Button text={"bad"} clickHandler={() => setBad(bad + 1)}/>
        <h1>statistics</h1>
        <Statistics g={good} n={neutral} b={bad} a={all} avg={calculateAvg} posPort={positivePortion}/>
      </div>
    </>
  )
}

export default App
