import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <p>{props.text} {props.value}</p>
  )
}

const Statisticss = (props) =>{
  let tot = (props.good+props.neutral+props.bad)
  if(tot ==0){
    return(
      <>
      <p>No data found</p>
      </>
    )
  }
  return(
      <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="total" value={tot}/>
      <StatisticLine text="average" value={(props.good*1+props.bad*-1)/tot+'%'}/>
      <StatisticLine text="positive" value={props.good*100/tot+'%'}/>
      </div>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const hanG = () =>{
      setGood(good+1)
  }
  const hanN = () =>{
      setNeutral(neutral+1)
  }
  const hanM = () =>{
      setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={hanG}>good</button>
      <button onClick={hanN}>neutral</button>
      <button onClick={hanM}>MORBIUS!!!!!</button>
      <h1>statistics</h1>
      <Statisticss good={good} neutral={neutral} bad={bad}/>
      {/* <p>gud {good}</p>
      <p>nutral {neutral}</p>
      <p>morbius {bad}</p>
      <p>total {(good+neutral+bad)}</p>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      <p>positive {good/(good+neutral+bad)}%</p> */}
    </div>
  )
}

export default App