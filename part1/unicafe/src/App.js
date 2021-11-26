import React, {useState} from 'react';
const Button = ({text, action}) => {
  return <button onClick={action}>{text}</button>;
};
const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
};
const Statistics = ({g, n, b}) => {
  const total = g + n + b;
  if (total !== 0) {
    const ave = (g - b) / total;
    const positive = g / total * 100;
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="Good" value={g} />
            <StatisticLine text="Neutral" value={n} />
            <StatisticLine text="Bad" value={b} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={ave} />
            <StatisticLine text="Positive" value={positive + ' %'} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p>No feedback given</p>;
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState (0);
  const [neutral, setNeutral] = useState (0);
  const [bad, setBad] = useState (0);

  const goodClick = () => setGood (good + 1);
  const neutralClick = () => setNeutral (neutral + 1);
  const badClick = () => setBad (bad + 1);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" action={goodClick} />
      <Button text="Neutral" action={neutralClick} />
      <Button text="Bad" action={badClick} />
      <h1>Statistics</h1>
      <Statistics g={good} n={neutral} b={bad} />
    </div>
  );
};

export default App;
