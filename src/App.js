import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Footer from './components/Footer'
import StateItem from './components/StateItem'

import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:stateName/:key" component={StateItem} />
        <Route exact path="/about" component={About} />
      </Switch>
    </BrowserRouter>
    <Footer />
  </>
)

export default App
