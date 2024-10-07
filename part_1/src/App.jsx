
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
    <p>Number of exercises {props.E1 + props.E2 + props.E3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content p1={part1.name} e1={part1.exercises} p2={part2.name} e2={part2.exercises} p3={part3.name} e3={part3.exercises}/>
      <Total E1={part1.exercises} E2={part2.exercises} E3={part3.exercises}/>
    </div>
  )
}

export default App