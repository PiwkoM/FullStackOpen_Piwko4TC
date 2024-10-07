
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
      <Part P={props.info[0].name} E={props.info[0].exercises}/>
      <Part P={props.info[1].name} E={props.info[1].exercises}/>
      <Part P={props.info[2].name} E={props.info[2].exercises}/>
      
    </div>
  )
}

const Total = (props) =>{
  return(
    <p>Number of exercises {props.inf_total[0].exercises + props.inf_total[1].exercises + props.inf_total[2].exercises}</p>
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
      <Content info={parts}/>
      <Total inf_total={parts}/>
    </div>
  )
}

export default App