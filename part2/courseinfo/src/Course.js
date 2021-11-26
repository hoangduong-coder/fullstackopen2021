import React from 'react'
const Header = ({course}) => {
  return <h2>{course.name}</h2>;
};

const Total = ({course}) => {
  const partList = course.parts;
  const sum = partList.reduce ((prev, curr) => prev + curr.exercises, 0);
  return <h4>Number of exercises {sum}</h4>;
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({course}) => {
  const partList = course.parts;
  return (
    <div>
      {partList.map (thisPart => <Part key={thisPart.id} part={thisPart} />)}
    </div>
  );
};

const Course = ({course}) => {
  return (
    <div>
      {course.map (thisPart => (
        <div>
          <Header course={thisPart} />
          <Content course={thisPart} />
          <Total course={thisPart} />
        </div>
      ))}
    </div>
  );
};

export default Course;