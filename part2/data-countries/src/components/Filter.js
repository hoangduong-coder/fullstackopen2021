import React, {useState} from "react"
import Weather from "./Weather";
const Details = ({object}) => {
    return(
        <div key={object.cca2} id="countryInfo">
            <h2>{object.name.official}</h2>
            <p>Capital:</p>
            <ul>
                {object.capital.map((cap, i) => <li key={i}>{cap}</li>)}
            </ul>
            <p>Population: {object.population}</p>
            <p>Languages:</p>
            <ul>
                {Object.keys(object.languages).map (key => (
                    <li key={key}>{object.languages[key]}</li>
                ))}
            </ul>
            <p>Flag:</p>
            <img src={object.flags.png} alt={`${object.demonyms.eng.f} flag`} id="image" />
            {
                object.capital.map((cap, i) => 
                    <Weather capital={cap} key={i}/>
                )
            }
        </div>
    )
}
const Country = ({detail}) => {
    const [show, setShow] = useState(false)
    return(
        <div>
            <p>{detail.name.common}</p>
            <button onClick={() => setShow(!show)}>
            {
                show ? "hide" : "show"
            }
            </button>
            {
                show && <Details object={detail} />
            }
        </div>
    )
}
const Filter = ({arr, keyword}) => {
  const result = arr.filter(obj => obj.name.common.toLowerCase().includes(keyword.toLowerCase()));
  if (result.length > 10) {
    return <p>Too many countries, specify another filter</p>;
  } else if (result.length === 1) {
    return result.map(obj => (
      <Details key={obj.cca2} object={obj}/>
    ));
  } else {
    return result.map(obj => <Country key={obj.cca2} detail={obj}/>);
  }
};
export default Filter;