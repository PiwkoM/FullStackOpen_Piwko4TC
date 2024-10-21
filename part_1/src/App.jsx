import { useState } from 'react'

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
      <p>gud {good}</p>
      <p>nutral {neutral}</p>
      <p>morbius {bad}</p>
    </div>
  )
}

export default App