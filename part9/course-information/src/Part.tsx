import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

//new interface
interface CourseDescription extends CoursePartBase {
  description: string
}

interface CourseSpecial extends CoursePartBase {
    type: "special",
    requirements: Array<string>
}
export type CoursePart = (CourseDescription & (CourseNormalPart | CourseSubmissionPart | CourseSpecial)) | CourseProjectPart;

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never) : never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }
  switch(part.type) {
    case("normal"):
      return(  
        <div>
          <h3>{part.name}, {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </div>
      );
    case("groupProject"):
      return(
        <div>
          <h3>{part.name}, {part.exerciseCount}</h3>
          <p>Number of project count: {part.groupProjectCount}</p>
        </div>
      )
    case("submission"):
      return(
        <div>
          <h3>{part.name}, {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>Submit exercises at: &quot;{part.exerciseSubmissionLink}&quot;</p>
        </div>
      )
    case("special"):
      return(
        <div>
          <h3>{part.name}, {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>Required skills:</p>
          <ul>
             {
                 part.requirements.map(obj => <li key={obj}>{obj}</li>)
             } 
          </ul>
        </div>
      )
    default:
      return assertNever(part)
  }
}

export default Part;