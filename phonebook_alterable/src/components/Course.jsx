const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    );
  };
  
  const Header = ({name}) => {
    return(
      //self explanatory
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    const totalArray = parts.map(part => Number(part.exercises)) 
    
    //complete honesty here, i still have no idea how .reduce() works.
    const total = totalArray.reduce((sum, exercises) => sum + exercises, 0);

    // let total = 0;
    // console.log(totalArray)
    // totalArray.forEach(element => {
    //     total += element
    // });

    return(
      //.map(objectOfArray => ()) == foreach objectOfArray in {}
      <div>
      {parts.map(part =>  (
        <Part key={part.id} part={part}/>
      ))}
      <p><b>Total exercises: {total}</b></p>
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