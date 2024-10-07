
const Header = (props) =>{
  console.log(props)
  return(
  <h1>{props.course}</h1>
  )
}
const Part = (props) =>{
  return(
    <p> {props.P} {props.E} </p>
  )
}
const Content = (props) =>{
  return(
    <div>
      <Part P={props.p1} E={props.e1}/>
      <Part P={props.p2} E={props.e2}/>
      <Part P={props.p3} E={props.e3}/>
    </div>
  )
}

const Total = (props) =>{
  return(
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content p1={part1} e1={exercises1} p2={part2} e2={exercises2} p3={part3} e3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
    </div>
  )
}

export default App