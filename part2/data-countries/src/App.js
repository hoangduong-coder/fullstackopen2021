import React, {useState, useEffect} from "react";
import axios from "axios";
import Filter from "./components/Filter";
import FilterInput from "./components/FilterInput";
const App = () => {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => 
      setCountries(response.data)
    )
  }, [])

  const handleChange = event => setKeyword(event.target.value)

  return(
    <div>
      <FilterInput keyword={keyword} action={handleChange}/>
      <Filter arr={countries} keyword={keyword}/>
    </div>
  )
}
export default App;
