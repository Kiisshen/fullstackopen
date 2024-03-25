const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
}

const Content = ({parts}) => {
    return (
      <>
        <div>
          {parts.map(
            (obj, idx) => <Part key={idx} part={obj.name} exercises={obj.exercises}/>
          )}
        </div>
      </>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <>
        <p>Number of exercises {total}</p>
      </>
    )
}

const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>   
      </>
    )
}

export default Course