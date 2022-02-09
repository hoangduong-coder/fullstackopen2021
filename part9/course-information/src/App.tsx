import React from 'react';
import Part, { CoursePart } from './Part';

const Header = ({name}:{name: string}) => {
  return(
    <h1>{name}</h1>
  )
}

const Content = ({ array }: {array: Array<CoursePart>}) => {
  return (
    <div>
      {
        array.map(part => <Part key={part.name} part={part}/>)
      }
    </div>
  )
}

const Total = ({ array }: { array: Array<CoursePart> }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        { array.reduce((carry, part) => carry + part.exerciseCount, 0) }
      </p>
    </div>
  )
}
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];
  return (
    <div>
      <Header name={courseName}/>
      <Content array={courseParts}/>
      <Total array={courseParts}/>
    </div>
  );
};

export default App;
