const Course = ({course}) =>{
    return(
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({name}) => {
    return(
      //self explanatory
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
      //.map(objectOfArray => ()) == foreach objectOfArray in {}
      <div>
      {parts.map(part =>  (
        <Part key={part.id} part={part}/>
      ))}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>  
        {part.name}: {part.exercises}
      </p>
    )
  }

  export default Course