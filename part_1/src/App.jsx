
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
    <p>Number of exercises {props.Ex1 + props.Ex2 + props.Ex3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content p1={parts[0].name} e1={parts[0].exercises} p2={parts[1].name} e2={parts[1].exercises} p3={parts[2].name} e3={parts[2].exercises}/>
      <Total Ex1={parts[0].exercises} Ex2={parts[1].exercises} Ex3={parts[2].exercises}/>
    </div>
  )
}

export default App