import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleClick = (type) => {
    switch (type) {
      case "good":
        store.dispatch({type: 'GOOD'})
        break
      case "ok":
        store.dispatch({type: 'OK'})
        break
      case "bad":
        store.dispatch({type: 'BAD'})
        break
      case "zero":
        store.dispatch({type: 'ZERO'})
        break
      default:
        break
    }
    
  }

  return (
    <div>
      <button onClick={e => handleClick("good")}>good</button> 
      <button onClick={e => handleClick("ok")}>ok</button> 
      <button onClick={e => handleClick("bad")}>bad</button>
      <button onClick={e => handleClick("zero")}>reset stats</button>
      <div>good: {store.getState().good}</div>
      <div>ok: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
