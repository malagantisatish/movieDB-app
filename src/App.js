import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import './App.css'
import SingleMovieDetails from './components/SingleMovieDetails'

// write your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/top-rated" component={TopRatedMovies} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/movie/:id" component={SingleMovieDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
