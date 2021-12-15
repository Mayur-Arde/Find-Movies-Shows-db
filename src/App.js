import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Movie from './components/SingleMovie'

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/movie/:id' children={<Movie/>}>
      </Route>
    </Switch>
  )
}

export default App
